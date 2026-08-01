package com.streamversex.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.streamversex.backend.dto.request.CreatePaymentOrderRequestDTO;
import com.streamversex.backend.dto.request.PaymentFailedRequestDTO;
import com.streamversex.backend.dto.request.VerifyPaymentRequestDTO;
import com.streamversex.backend.dto.response.PaymentHistoryResponseDTO;
import com.streamversex.backend.dto.response.PaymentOrderResponseDTO;
import com.streamversex.backend.security.CustomUserDetails;
import com.streamversex.backend.service.PaymentService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
public class PaymentController {

    private final PaymentService paymentService;


    // ==================== CREATE ORDER ====================

    @PostMapping("/order")
    public ResponseEntity<PaymentOrderResponseDTO> createOrder(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody CreatePaymentOrderRequestDTO request) {

        return ResponseEntity.ok(
                paymentService.createOrder(
                        userDetails.getId(),
                        request
                )
        );
    }


    // ==================== VERIFY PAYMENT ====================

    @PostMapping("/verify")
    public ResponseEntity<Void> verifyPayment(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody VerifyPaymentRequestDTO request) {

        paymentService.verifyPayment(
                userDetails.getId(),
                request
        );

        return ResponseEntity.ok().build();
    }
    
 // ==================== PAYMENT HISTORY ====================

    @GetMapping("/history")
    public ResponseEntity<List<PaymentHistoryResponseDTO>> getPaymentHistory(
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        return ResponseEntity.ok(
                paymentService.getPaymentHistory(
                        userDetails.getId()
                )
        );
    }
    
    @PostMapping("/failed")
    public ResponseEntity<Void> paymentFailed(

            @AuthenticationPrincipal
            CustomUserDetails userDetails,

            @Valid
            @RequestBody
            PaymentFailedRequestDTO request) {

        paymentService.paymentFailed(
                userDetails.getId(),
                request
        );

        return ResponseEntity.ok().build();
    }
}