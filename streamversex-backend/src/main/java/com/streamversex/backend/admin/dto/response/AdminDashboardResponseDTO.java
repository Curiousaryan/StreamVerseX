package com.streamversex.backend.admin.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminDashboardResponseDTO {

    // ==================== USERS ====================

    private long totalUsers;

    private long activeUsers;

    private long blockedUsers;

    private long premiumUsers;

    // ==================== PAYMENTS ====================

    private long totalPayments;

    private long successfulPayments;

    private long failedPayments;

    // Amount stored in paise
    private long totalRevenue;

    // Current month revenue (paise)
    private long monthlyRevenue;

    // ==================== CONTENT ====================

    private long totalReviews;

    private long totalFavorites;

    private long totalWatchlistItems;

}