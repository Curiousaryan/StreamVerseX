package com.streamversex.backend.mapper;

import org.springframework.stereotype.Component;

import com.streamversex.backend.dto.response.ProfileResponseDTO;
import com.streamversex.backend.model.User;

@Component
public class ProfileMapper {

    public ProfileResponseDTO toResponseDTO(User user) {

        return ProfileResponseDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .profileImageUrl(user.getProfileImageUrl())
                .emailVerified(user.isEmailVerified())
                .premium(user.isPremium())

                // ==================== SUBSCRIPTION ====================

                .subscriptionPlan(user.getSubscriptionPlan())
                .subscriptionStartedAt(user.getSubscriptionStartedAt())
                .subscriptionExpiresAt(user.getSubscriptionExpiresAt())

                // ==================== TIMESTAMPS ====================

                .createdAt(user.getCreatedAt())
                .updatedAt(user.getUpdatedAt())
                .build();
    }
}