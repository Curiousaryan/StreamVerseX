package com.streamversex.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.streamversex.backend.dto.request.CreatePaymentOrderRequestDTO;
import com.streamversex.backend.dto.request.PaymentFailedRequestDTO;
import com.streamversex.backend.dto.request.VerifyPaymentRequestDTO;
import com.streamversex.backend.dto.response.PaymentHistoryResponseDTO;
import com.streamversex.backend.dto.response.PaymentOrderResponseDTO;
import com.streamversex.backend.security.CustomUserDetails;
import com.streamversex.backend.service.PaymentService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/payments")
@RequiredArgsConstructor
@Tag(
        name = "Payments",
        description = "Manage subscription payments, payment verification and payment history."
)
public class PaymentController {

    private final PaymentService paymentService;

    // ==================== CREATE ORDER ====================

    @Operation(
            summary = "Create Payment Order",
            description = "Creates a new Razorpay order for purchasing a premium subscription."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Payment order created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid payment request"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
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

    @Operation(
            summary = "Verify Payment",
            description = "Verifies the Razorpay payment signature and activates the user's premium subscription."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Payment verified successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid payment signature"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
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

    @Operation(
            summary = "Payment History",
            description = "Returns the authenticated user's complete payment history."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Payment history retrieved successfully")
    })
    @GetMapping("/history")
    public ResponseEntity<List<PaymentHistoryResponseDTO>> getPaymentHistory(
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        return ResponseEntity.ok(
                paymentService.getPaymentHistory(
                        userDetails.getId()
                )
        );
    }

    // ==================== PAYMENT FAILED ====================

    @Operation(
            summary = "Mark Payment Failed",
            description = "Stores a failed payment attempt for auditing and payment history."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Failed payment recorded successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @PostMapping("/failed")
    public ResponseEntity<Void> paymentFailed(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody PaymentFailedRequestDTO request) {

        paymentService.paymentFailed(
                userDetails.getId(),
                request
        );

        return ResponseEntity.ok().build();
    }
}