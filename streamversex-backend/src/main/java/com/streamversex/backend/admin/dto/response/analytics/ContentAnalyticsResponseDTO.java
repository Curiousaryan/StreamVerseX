package com.streamversex.backend.admin.dto.response.analytics;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ContentAnalyticsResponseDTO {

    private long totalReviews;

    private long totalFavorites;

    private long totalWatchlistItems;

}