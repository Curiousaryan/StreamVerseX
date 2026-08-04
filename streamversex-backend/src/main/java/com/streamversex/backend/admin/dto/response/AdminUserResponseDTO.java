package com.streamversex.backend.admin.dto.response;

import java.time.Instant;

import com.streamversex.backend.model.Role;
import com.streamversex.backend.model.SubscriptionPlan;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminUserResponseDTO {

    private String id;

    private String name;

    private String email;

    private Role role;

    private boolean blocked;

    private boolean premium;

    private SubscriptionPlan subscriptionPlan;

    private Instant subscriptionExpiresAt;

    private Instant createdAt;
}