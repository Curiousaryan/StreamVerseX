package com.streamversex.backend.payment;

import com.streamversex.backend.model.SubscriptionPlan;

public final class SubscriptionPricing {

    private SubscriptionPricing() {
    }

    public static long getAmount(SubscriptionPlan plan) {

        return switch (plan) {

            case MONTHLY -> 19900L;   // ₹199

            case YEARLY -> 199900L;   // ₹1,999
        };
    }
}