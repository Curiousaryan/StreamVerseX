package com.streamversex.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.streamversex.backend.dto.response.SubscriptionResponseDTO;
import com.streamversex.backend.security.CustomUserDetails;
import com.streamversex.backend.service.SubscriptionService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/subscriptions")
@RequiredArgsConstructor
public class SubscriptionController {

    private final SubscriptionService subscriptionService;


    // ==================== MY SUBSCRIPTION ====================

    @GetMapping("/me")
    public ResponseEntity<SubscriptionResponseDTO> getMySubscription(
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        return ResponseEntity.ok(
                subscriptionService.getSubscription(
                        userDetails.getId()
                )
        );
    }
}