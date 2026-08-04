package com.streamversex.backend.admin.dto.response.analytics;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class UserAnalyticsResponseDTO {

    private long totalUsers;
    private long premiumUsers;
    private long blockedUsers;
    private long verifiedUsers;

    private long newUsersToday;
    private long newUsersThisMonth;

}