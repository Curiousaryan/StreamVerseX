package com.streamversex.backend.admin.service;

import java.util.List;

import com.streamversex.backend.admin.dto.response.analytics.ContentAnalyticsResponseDTO;
import com.streamversex.backend.admin.dto.response.analytics.PaymentAnalyticsResponseDTO;
import com.streamversex.backend.admin.dto.response.analytics.RevenueAnalyticsResponseDTO;
import com.streamversex.backend.admin.dto.response.analytics.TopContentDTO;
import com.streamversex.backend.admin.dto.response.analytics.UserAnalyticsResponseDTO;

public interface AnalyticsService {

    RevenueAnalyticsResponseDTO getRevenueAnalytics();

    UserAnalyticsResponseDTO getUserAnalytics();

    PaymentAnalyticsResponseDTO getPaymentAnalytics();

    ContentAnalyticsResponseDTO getContentAnalytics();

    List<TopContentDTO> getTopReviewedMovies();

    List<TopContentDTO> getTopFavoritedMovies();

    List<TopContentDTO> getTopWatchlistedMovies();

}