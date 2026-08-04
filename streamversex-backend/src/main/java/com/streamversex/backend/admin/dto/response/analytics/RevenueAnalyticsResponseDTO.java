package com.streamversex.backend.admin.dto.response.analytics;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class RevenueAnalyticsResponseDTO {

    private long todayRevenue;
    private long weeklyRevenue;
    private long monthlyRevenue;
    private long yearlyRevenue;
    private long totalRevenue;

}