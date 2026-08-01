package com.streamversex.backend.dto.response;

import com.streamversex.backend.model.SubscriptionPlan;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class PaymentOrderResponseDTO {

    private String orderId;

    private Long amount;

    private String currency;

    private SubscriptionPlan plan;

    private String razorpayKeyId;
}