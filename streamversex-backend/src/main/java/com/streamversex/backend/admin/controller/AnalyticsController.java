package com.streamversex.backend.admin.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.streamversex.backend.admin.dto.response.analytics.ContentAnalyticsResponseDTO;
import com.streamversex.backend.admin.dto.response.analytics.PaymentAnalyticsResponseDTO;
import com.streamversex.backend.admin.dto.response.analytics.RevenueAnalyticsResponseDTO;
import com.streamversex.backend.admin.dto.response.analytics.TopContentDTO;
import com.streamversex.backend.admin.dto.response.analytics.UserAnalyticsResponseDTO;
import com.streamversex.backend.admin.service.AnalyticsService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/admin/analytics")
@RequiredArgsConstructor
@Tag(
        name = "Analytics",
        description = "Administrative analytics APIs for revenue, users, payments and platform content."
)
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    // ==================== REVENUE ANALYTICS ====================

    @Operation(
            summary = "Revenue Analytics",
            description = "Returns revenue analytics including daily, weekly, monthly, yearly and total revenue."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Revenue analytics retrieved successfully")
    })
    @GetMapping("/revenue")
    public ResponseEntity<RevenueAnalyticsResponseDTO> getRevenueAnalytics() {

        return ResponseEntity.ok(
                analyticsService.getRevenueAnalytics()
        );
    }

    // ==================== USER ANALYTICS ====================

    @Operation(
            summary = "User Analytics",
            description = "Returns user statistics including total users, premium users, blocked users and new registrations."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "User analytics retrieved successfully")
    })
    @GetMapping("/users")
    public ResponseEntity<UserAnalyticsResponseDTO>
            getUserAnalytics() {

        return ResponseEntity.ok(
                analyticsService.getUserAnalytics()
        );
    }

    // ==================== PAYMENT ANALYTICS ====================

    @Operation(
            summary = "Payment Analytics",
            description = "Returns analytics related to subscription payments."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Payment analytics retrieved successfully")
    })
    @GetMapping("/payments")
    public ResponseEntity<PaymentAnalyticsResponseDTO>
            getPaymentAnalytics() {

        return ResponseEntity.ok(
                analyticsService.getPaymentAnalytics()
        );
    }

    // ==================== CONTENT ANALYTICS ====================

    @Operation(
            summary = "Content Analytics",
            description = "Returns analytics related to reviews, favorites and watchlists."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Content analytics retrieved successfully")
    })
    @GetMapping("/content")
    public ResponseEntity<ContentAnalyticsResponseDTO>
            getContentAnalytics() {

        return ResponseEntity.ok(
                analyticsService.getContentAnalytics()
        );
    }

    // ==================== TOP REVIEWED ====================

    @Operation(
            summary = "Top Reviewed Content",
            description = "Returns the most reviewed movies and TV shows."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Top reviewed content retrieved successfully")
    })
    @GetMapping("/top-reviewed")
    public ResponseEntity<List<TopContentDTO>>
            getTopReviewedMovies() {

        return ResponseEntity.ok(
                analyticsService.getTopReviewedMovies()
        );
    }

    // ==================== TOP FAVORITES ====================

    @Operation(
            summary = "Top Favorited Content",
            description = "Returns the most favorited movies and TV shows."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Top favorited content retrieved successfully")
    })
    @GetMapping("/top-favorites")
    public ResponseEntity<List<TopContentDTO>>
            getTopFavorites() {

        return ResponseEntity.ok(
                analyticsService.getTopFavoritedMovies()
        );
    }

    // ==================== TOP WATCHLIST ====================

    @Operation(
            summary = "Top Watchlisted Content",
            description = "Returns the most watchlisted movies and TV shows."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Top watchlisted content retrieved successfully")
    })
    @GetMapping("/top-watchlist")
    public ResponseEntity<List<TopContentDTO>>
            getTopWatchlist() {

        return ResponseEntity.ok(
                analyticsService.getTopWatchlistedMovies()
        );
    }
}