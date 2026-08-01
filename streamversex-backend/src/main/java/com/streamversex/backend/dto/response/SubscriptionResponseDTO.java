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
public class SubscriptionResponseDTO {

    private boolean premium;

    private SubscriptionPlan plan;

    private Instant startedAt;

    private Instant expiresAt;

    private boolean active;
}