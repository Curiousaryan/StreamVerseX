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
public class ProfileResponseDTO {

    private String id;

    private String name;

    private String email;

    private String profileImageUrl;

    private boolean emailVerified;

    private boolean premium;

    // ==================== SUBSCRIPTION ====================

    private SubscriptionPlan subscriptionPlan;

    private Instant subscriptionStartedAt;

    private Instant subscriptionExpiresAt;

    // ==================== TIMESTAMPS ====================

    private Instant createdAt;

    private Instant updatedAt;
}