package com.streamversex.backend.dto.response;

import java.time.Instant;

import com.streamversex.backend.model.SubscriptionPlan;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class InvoiceResponseDTO {

    private String id;

    private String invoiceNumber;

    private String customerName;

    private String customerEmail;

    private SubscriptionPlan plan;

    private Long amount;

    private String currency;

    private Instant paidAt;

    private Instant createdAt;
}