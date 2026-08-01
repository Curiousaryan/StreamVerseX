package com.streamversex.backend.dto.request;

import com.streamversex.backend.model.SubscriptionPlan;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreatePaymentOrderRequestDTO {

    @NotNull(message = "Subscription plan is required.")
    private SubscriptionPlan plan;
}