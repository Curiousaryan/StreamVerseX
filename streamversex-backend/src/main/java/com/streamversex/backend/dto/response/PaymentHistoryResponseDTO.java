package com.streamversex.backend.dto.response;

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
public class PaymentHistoryResponseDTO {

    private String id;

    private SubscriptionPlan plan;

    private Long amount;

    private String currency;

    private PaymentStatus status;

    private String razorpayOrderId;

    private String razorpayPaymentId;

    private Instant paidAt;

    private Instant createdAt;
}