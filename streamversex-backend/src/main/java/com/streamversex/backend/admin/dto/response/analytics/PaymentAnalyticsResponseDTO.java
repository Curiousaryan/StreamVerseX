package com.streamversex.backend.admin.dto.response.analytics;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class PaymentAnalyticsResponseDTO {

    private long totalPayments;

    private long successfulPayments;


    private long createdPayments;


    private double successRate;

    private double failureRate;

    private long averagePaymentAmount;
}