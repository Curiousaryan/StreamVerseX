package com.streamversex.backend.model;

import java.time.Instant;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "users")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    private String id;

    private String name;

    @Indexed(unique = true)
    private String email;

    private String passwordHash;

    @Builder.Default
    private Role role = Role.USER;

    @Builder.Default
    private boolean isEmailVerified = false;

    @Builder.Default
    private boolean isBlocked = false;

    @Builder.Default
    private boolean isPremium = false;

    private String profileImageUrl;

    private String razorpayCustomerId;


    // ==================== SUBSCRIPTION ====================

    private SubscriptionPlan subscriptionPlan;

    private Instant subscriptionStartedAt;

    private Instant subscriptionExpiresAt;


    // ==================== TIMESTAMPS ====================

    @CreatedDate
    private Instant createdAt;

    @LastModifiedDate
    private Instant updatedAt;
}