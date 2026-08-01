package com.streamversex.backend.service.impl;

import java.time.Instant;
import java.util.List;

import org.springframework.stereotype.Service;

import com.streamversex.backend.dto.response.SubscriptionResponseDTO;
import com.streamversex.backend.email.EmailService;
import com.streamversex.backend.model.User;
import com.streamversex.backend.repository.UserRepository;
import com.streamversex.backend.service.SubscriptionService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class SubscriptionServiceImpl implements SubscriptionService {

    private final UserRepository userRepository;
    private final EmailService emailService;

    @Override
    public void expireSubscriptions() {

        Instant now = Instant.now();

        List<User> expiredUsers =
                userRepository
                        .findByIsPremiumTrueAndSubscriptionExpiresAtBefore(now);

        if (expiredUsers.isEmpty()) {
            return;
        }

        for (User user : expiredUsers) {

            user.setPremium(false);

            user.setSubscriptionPlan(null);
            user.setSubscriptionStartedAt(null);
            user.setSubscriptionExpiresAt(null);

            // Send expiry email
            emailService.sendSubscriptionExpiredEmail(
                    user.getEmail(),
                    user.getName()
            );
        }

        userRepository.saveAll(expiredUsers);
    }
 // ==================== GET SUBSCRIPTION ====================

    @Override
    public SubscriptionResponseDTO getSubscription(
            String userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found.")
                );

        boolean active =
                user.isPremium()
                && user.getSubscriptionExpiresAt() != null
                && user.getSubscriptionExpiresAt()
                        .isAfter(Instant.now());

        return SubscriptionResponseDTO.builder()
                .premium(user.isPremium())
                .plan(user.getSubscriptionPlan())
                .startedAt(user.getSubscriptionStartedAt())
                .expiresAt(user.getSubscriptionExpiresAt())
                .active(active)
                .build();
    }
}