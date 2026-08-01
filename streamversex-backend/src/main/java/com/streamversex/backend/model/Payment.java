package com.streamversex.backend.model;

import java.time.Instant;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import com.streamversex.backend.payment.PaymentStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "payments")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Payment {

    @Id
    private String id;

    // ==================== USER ====================

    @Indexed
    private String userId;


    // ==================== SUBSCRIPTION ====================

    private SubscriptionPlan plan;


    // ==================== RAZORPAY ====================

    @Indexed(unique = true)
    private String razorpayOrderId;

    private String razorpayPaymentId;

    private String razorpaySignature;


    // ==================== PAYMENT DETAILS ====================

    /*
     * Razorpay amount is stored in the smallest currency unit.
     *
     * Example:
     * ₹199 = 19900 paise
     */
    private Long amount;

    @Builder.Default
    private String currency = "INR";

    @Builder.Default
    private PaymentStatus status = PaymentStatus.CREATED;


    // ==================== TIMESTAMPS ====================

    private Instant paidAt;

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;
}