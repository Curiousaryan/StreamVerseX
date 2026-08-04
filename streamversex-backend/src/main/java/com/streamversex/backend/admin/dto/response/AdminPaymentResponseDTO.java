package com.streamversex.backend.admin.dto.response;

import java.time.Instant;

import com.streamversex.backend.model.SubscriptionPlan;
import com.streamversex.backend.payment.PaymentStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminPaymentResponseDTO {

    private String id;

    private String userId;

    private String razorpayOrderId;

    private String razorpayPaymentId;

    private SubscriptionPlan plan;

    private long amount;

    private String currency;

    private PaymentStatus status;

    private Instant createdAt;

    private Instant paidAt;

}