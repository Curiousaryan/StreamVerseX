package com.streamversex.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.streamversex.backend.dto.response.SubscriptionResponseDTO;
import com.streamversex.backend.security.CustomUserDetails;
import com.streamversex.backend.service.SubscriptionService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/subscriptions")
@RequiredArgsConstructor
@Tag(
        name = "Subscriptions",
        description = "Retrieve premium subscription details for the authenticated user."
)
public class SubscriptionController {

    private final SubscriptionService subscriptionService;

    // ==================== MY SUBSCRIPTION ====================

    @Operation(
            summary = "Get My Subscription",
            description = "Returns the authenticated user's current subscription details, including plan, status and expiry date."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Subscription retrieved successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
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