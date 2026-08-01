package com.streamversex.backend.model;

import java.time.Instant;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "invoices")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Invoice {

    @Id
    private String id;

    // ==================== INVOICE ====================

    @Indexed(unique = true)
    private String invoiceNumber;


    // ==================== CUSTOMER SNAPSHOT ====================

    @Indexed
    private String userId;

    /*
     * Snapshot of customer information at the time
     * the invoice was generated.
     *
     * These values should not change even if the
     * user later updates their profile.
     */
    private String customerName;

    private String customerEmail;


    // ==================== PAYMENT ====================

    @Indexed(unique = true)
    private String paymentId;

    private SubscriptionPlan plan;

    /*
     * Amount stored in smallest currency unit.
     *
     * Example:
     * ₹199 = 19900 paise
     */
    private Long amount;

    @Builder.Default
    private String currency = "INR";

    private Instant paidAt;


    // ==================== TIMESTAMPS ====================

    @CreatedDate
    private Instant createdAt;
}