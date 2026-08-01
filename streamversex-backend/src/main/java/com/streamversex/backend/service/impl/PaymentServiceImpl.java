package com.streamversex.backend.service.impl;

import java.nio.charset.StandardCharsets;
import java.time.Instant;
import java.time.ZoneOffset;
import java.time.ZonedDateTime;
import java.util.List;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.razorpay.Order;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import com.streamversex.backend.dto.request.CreatePaymentOrderRequestDTO;
import com.streamversex.backend.dto.request.PaymentFailedRequestDTO;
import com.streamversex.backend.dto.request.VerifyPaymentRequestDTO;
import com.streamversex.backend.dto.response.PaymentHistoryResponseDTO;
import com.streamversex.backend.dto.response.PaymentOrderResponseDTO;
import com.streamversex.backend.email.EmailService;
import com.streamversex.backend.model.Invoice;
import com.streamversex.backend.model.Payment;
import com.streamversex.backend.model.SubscriptionPlan;
import com.streamversex.backend.model.User;
import com.streamversex.backend.payment.PaymentStatus;
import com.streamversex.backend.payment.SubscriptionPricing;
import com.streamversex.backend.repository.PaymentRepository;
import com.streamversex.backend.repository.UserRepository;
import com.streamversex.backend.service.InvoiceService;
import com.streamversex.backend.service.PaymentService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PaymentServiceImpl implements PaymentService {

    private final RazorpayClient razorpayClient;
    private final PaymentRepository paymentRepository;
    private final UserRepository userRepository;
    private final InvoiceService invoiceService;
    private final EmailService emailService;


    @Value("${razorpay.key-id}")
    private String razorpayKeyId;

    @Value("${razorpay.key-secret}")
    private String razorpayKeySecret;


    // ==================== CREATE ORDER ====================

    @Override
    public PaymentOrderResponseDTO createOrder(
            String userId,
            CreatePaymentOrderRequestDTO request) {

        // Make sure authenticated user exists.
        userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found."
                        )
                );


        SubscriptionPlan plan =
                request.getPlan();


        /*
         * Amount is calculated by backend.
         *
         * Never accept payment amount from frontend.
         */
        long amount =
                SubscriptionPricing.getAmount(plan);


        try {

            JSONObject orderRequest =
                    new JSONObject();


            orderRequest.put(
                    "amount",
                    amount
            );


            orderRequest.put(
                    "currency",
                    "INR"
            );


            /*
             * Razorpay receipt should be unique.
             */
            orderRequest.put(
                    "receipt",
                    "svx_" + System.currentTimeMillis()
            );


            // Create order at Razorpay.
            Order razorpayOrder =
                    razorpayClient.orders.create(
                            orderRequest
                    );


            String orderId =
                    razorpayOrder.get("id");


            /*
             * Save our own payment record.
             *
             * At this point money has NOT been paid.
             */
            Payment payment =
                    Payment.builder()
                            .userId(userId)
                            .plan(plan)
                            .razorpayOrderId(orderId)
                            .amount(amount)
                            .currency("INR")
                            .status(PaymentStatus.CREATED)
                            .build();


            paymentRepository.save(payment);


            // Send order information to frontend.
            return PaymentOrderResponseDTO.builder()
                    .orderId(orderId)
                    .amount(amount)
                    .currency("INR")
                    .plan(plan)
                    .razorpayKeyId(razorpayKeyId)
                    .build();


        } catch (RazorpayException e) {

            throw new RuntimeException(
                    "Failed to create Razorpay order: "
                            + e.getMessage(),
                    e
            );
        }
    }


    // ==================== VERIFY PAYMENT ====================

    @Override
    public void verifyPayment(
            String userId,
            VerifyPaymentRequestDTO request) {

        Payment payment = paymentRepository
                .findByRazorpayOrderId(
                        request.getRazorpayOrderId()
                )
                .orElseThrow(() ->
                        new RuntimeException(
                                "Payment order not found."
                        )
                );


        // ==================== OWNERSHIP ====================

        if (!payment.getUserId().equals(userId)) {

            throw new RuntimeException(
                    "You are not authorized to verify this payment."
            );
        }


        // ==================== ALREADY PAID ====================

        if (payment.getStatus() == PaymentStatus.PAID) {

            throw new RuntimeException(
                    "Payment has already been verified."
            );
        }


        // ==================== VERIFY SIGNATURE ====================

        String payload =
                request.getRazorpayOrderId()
                + "|"
                + request.getRazorpayPaymentId();

        String expectedSignature =
                generateHmacSha256(
                        payload,
                        razorpayKeySecret
                );

        if (!expectedSignature.equals(
                request.getRazorpaySignature())) {

            throw new RuntimeException(
                    "Invalid Razorpay payment signature."
            );
        }


        // ==================== PAYMENT SUCCESS ====================

        Instant now = Instant.now();

        payment.setRazorpayPaymentId(
                request.getRazorpayPaymentId()
        );

        payment.setRazorpaySignature(
                request.getRazorpaySignature()
        );

        payment.setStatus(PaymentStatus.PAID);

        payment.setPaidAt(now);


        // ==================== GET USER ====================

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found."
                        )
                );


        // ==================== SUBSCRIPTION BASE DATE ====================

        Instant baseInstant;

        if (user.isPremium()
                && user.getSubscriptionExpiresAt() != null
                && user.getSubscriptionExpiresAt().isAfter(now)) {

            baseInstant =
                    user.getSubscriptionExpiresAt();

        } else {

            baseInstant = now;

            user.setSubscriptionStartedAt(now);
        }


        // ==================== CALCULATE EXPIRY ====================

        ZonedDateTime baseDate =
                baseInstant.atZone(ZoneOffset.UTC);

        ZonedDateTime expiryDate;

        switch (payment.getPlan()) {

            case MONTHLY ->
                expiryDate = baseDate.plusMonths(1);

            case YEARLY ->
                expiryDate = baseDate.plusYears(1);

            default ->
                throw new RuntimeException(
                        "Unsupported subscription plan."
                );
        }


        // ==================== ACTIVATE PREMIUM ====================

        user.setPremium(true);

        user.setSubscriptionPlan(
                payment.getPlan()
        );

        user.setSubscriptionExpiresAt(
                expiryDate.toInstant()
        );


     // ==================== SAVE ====================

     // Save verified payment
     Payment savedPayment =
             paymentRepository.save(payment);

     // Save activated subscription
     userRepository.save(user);

     // Create invoice
     Invoice invoice =
             invoiceService.createInvoice(savedPayment);

     // Generate PDF
     byte[] pdf =
             invoiceService.generateInvoicePdf(
                     userId,
                     invoice.getId()
             );

     // Email invoice
     emailService.sendInvoiceEmail(
             user.getEmail(),
             user.getName(),
             invoice.getInvoiceNumber(),
             pdf
     );
    }
    
    
    // ==================== HMAC SHA256 ====================

    private String generateHmacSha256(
            String data,
            String secret) {

        try {

            Mac mac =
                    Mac.getInstance(
                            "HmacSHA256"
                    );


            SecretKeySpec secretKey =
                    new SecretKeySpec(
                            secret.getBytes(
                                    StandardCharsets.UTF_8
                            ),
                            "HmacSHA256"
                    );


            mac.init(secretKey);


            byte[] hash =
                    mac.doFinal(
                            data.getBytes(
                                    StandardCharsets.UTF_8
                            )
                    );


            StringBuilder hex =
                    new StringBuilder();


            for (byte b : hash) {

                hex.append(
                        String.format(
                                "%02x",
                                b
                        )
                );
            }


            return hex.toString();


        } catch (Exception e) {

            throw new RuntimeException(
                    "Failed to verify payment signature.",
                    e
            );
        }
    }
    
 // ==================== PAYMENT HISTORY ====================

    @Override
    public List<PaymentHistoryResponseDTO> getPaymentHistory(
            String userId) {

        // Make sure user exists
        userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found.")
                );

        return paymentRepository
                .findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(payment ->
                        PaymentHistoryResponseDTO.builder()
                                .id(payment.getId())
                                .plan(payment.getPlan())
                                .amount(payment.getAmount())
                                .currency(payment.getCurrency())
                                .status(payment.getStatus())
                                .razorpayOrderId(
                                        payment.getRazorpayOrderId()
                                )
                                .razorpayPaymentId(
                                        payment.getRazorpayPaymentId()
                                )
                                .paidAt(payment.getPaidAt())
                                .createdAt(payment.getCreatedAt())
                                .build()
                )
                .toList();
    }
    
    @Override
    public void paymentFailed(
            String userId,
            PaymentFailedRequestDTO request) {

        Payment payment =
                paymentRepository
                        .findByRazorpayOrderId(
                                request.getRazorpayOrderId()
                        )
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Payment not found."
                                )
                        );

        if (!payment.getUserId().equals(userId)) {
            throw new RuntimeException(
                    "Unauthorized payment."
            );
        }

        payment.setStatus(
                PaymentStatus.FAILED
        );

        payment.setRazorpayPaymentId(
                request.getRazorpayPaymentId()
        );

        paymentRepository.save(payment);
    }
}