package com.streamversex.backend.admin.service.impl;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;
import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.stereotype.Service;

import com.streamversex.backend.admin.dto.response.AverageRevenueResult;
import com.streamversex.backend.admin.dto.response.RevenueResult;
import com.streamversex.backend.admin.dto.response.TopContentResult;
import com.streamversex.backend.admin.dto.response.analytics.ContentAnalyticsResponseDTO;
import com.streamversex.backend.admin.dto.response.analytics.PaymentAnalyticsResponseDTO;
import com.streamversex.backend.admin.dto.response.analytics.RevenueAnalyticsResponseDTO;
import com.streamversex.backend.admin.dto.response.analytics.TopContentDTO;
import com.streamversex.backend.admin.dto.response.analytics.UserAnalyticsResponseDTO;
import com.streamversex.backend.admin.service.AnalyticsService;
import com.streamversex.backend.payment.PaymentStatus;
import com.streamversex.backend.repository.FavoriteRepository;
import com.streamversex.backend.repository.PaymentRepository;
import com.streamversex.backend.repository.ReviewRepository;
import com.streamversex.backend.repository.UserRepository;
import com.streamversex.backend.repository.WatchlistRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnalyticsServiceImpl implements AnalyticsService {

    private final MongoTemplate mongoTemplate;

    private final UserRepository userRepository;

    private final PaymentRepository paymentRepository;

    private final ReviewRepository reviewRepository;

    private final FavoriteRepository favoriteRepository;

    private final WatchlistRepository watchlistRepository;

    @Override
    public RevenueAnalyticsResponseDTO getRevenueAnalytics() {

        ZoneId zone = ZoneId.systemDefault();

        Instant today =
                LocalDate.now()
                        .atStartOfDay(zone)
                        .toInstant();

        Instant week =
                LocalDate.now()
                        .minusDays(7)
                        .atStartOfDay(zone)
                        .toInstant();

        Instant month =
                LocalDate.now()
                        .withDayOfMonth(1)
                        .atStartOfDay(zone)
                        .toInstant();

        Instant year =
                LocalDate.now()
                        .withDayOfYear(1)
                        .atStartOfDay(zone)
                        .toInstant();

        return RevenueAnalyticsResponseDTO.builder()

                .todayRevenue(
                        getRevenueSince(today)
                )

                .weeklyRevenue(
                        getRevenueSince(week)
                )

                .monthlyRevenue(
                        getRevenueSince(month)
                )

                .yearlyRevenue(
                        getRevenueSince(year)
                )

                .totalRevenue(
                        getTotalRevenue()
                )

                .build();
    }
    

    @Override
    public UserAnalyticsResponseDTO getUserAnalytics() {

        ZoneId zone = ZoneId.systemDefault();

        Instant today =
                LocalDate.now()
                        .atStartOfDay(zone)
                        .toInstant();

        Instant month =
                LocalDate.now()
                        .withDayOfMonth(1)
                        .atStartOfDay(zone)
                        .toInstant();

        return UserAnalyticsResponseDTO.builder()

                .totalUsers(
                        userRepository.count()
                )

                .premiumUsers(
                        userRepository.countByIsPremiumTrue()
                )

                .blockedUsers(
                        userRepository.countByIsBlockedTrue()
                )

                .verifiedUsers(
                        userRepository.countByIsEmailVerifiedTrue()
                )

                .newUsersToday(
                        userRepository.countByCreatedAtAfter(today)
                )

                .newUsersThisMonth(
                        userRepository.countByCreatedAtAfter(month)
                )

                .build();
    }

    
    @Override
    public PaymentAnalyticsResponseDTO getPaymentAnalytics() {

        long total =
                paymentRepository.count();

        long paid =
                paymentRepository.countByStatus(
                        PaymentStatus.PAID
                );

        long failed =
                paymentRepository.countByStatus(
                        PaymentStatus.FAILED
                );

        long created =
                paymentRepository.countByStatus(
                        PaymentStatus.CREATED
                );

        double successRate =
                total == 0
                        ? 0
                        : (paid * 100.0) / total;

        double failureRate =
                total == 0
                        ? 0
                        : (failed * 100.0) / total;

        return PaymentAnalyticsResponseDTO.builder()

                .totalPayments(total)

                .successfulPayments(paid)


                .createdPayments(created)

                .successRate(successRate)

                .failureRate(failureRate)

                .averagePaymentAmount(
                        getAveragePaymentAmount()
                )

                .build();
    }
    
    
    @Override
    public ContentAnalyticsResponseDTO getContentAnalytics() {

        return ContentAnalyticsResponseDTO.builder()

                .totalReviews(
                        reviewRepository.count()
                )

                .totalFavorites(
                        favoriteRepository.count()
                )

                .totalWatchlistItems(
                        watchlistRepository.count()
                )

                .build();
    }
    

    @Override
    public List<TopContentDTO> getTopReviewedMovies() {

        Aggregation aggregation =
                Aggregation.newAggregation(

                        Aggregation.group("contentId")
                                .count()
                                .as("total"),

                        Aggregation.project("total")
                                .and("_id")
                                .as("contentId"),

                        Aggregation.sort(
                                Sort.Direction.DESC,
                                "total"
                        ),

                        Aggregation.limit(10)

                );

        AggregationResults<TopContentResult> results =
                mongoTemplate.aggregate(
                        aggregation,
                        "reviews",
                        TopContentResult.class
                );

        return results.getMappedResults()

                .stream()

                .map(item ->

                        TopContentDTO.builder()

                                .contentId(
                                        item.getContentId()
                                )

                                .total(
                                        item.getTotal()
                                )

                                .build()

                )

                .toList();

    }
    
    

    @Override
    public List<TopContentDTO> getTopFavoritedMovies() {

        Aggregation aggregation =
                Aggregation.newAggregation(

                        Aggregation.group("contentId")
                                .count()
                                .as("total"),

                        Aggregation.project("total")
                                .and("_id")
                                .as("contentId"),

                        Aggregation.sort(
                                Sort.Direction.DESC,
                                "total"
                        ),

                        Aggregation.limit(10)

                );

        AggregationResults<TopContentResult> results =
                mongoTemplate.aggregate(
                        aggregation,
                        "favorites",
                        TopContentResult.class
                );

        return results.getMappedResults()

                .stream()

                .map(item ->

                        TopContentDTO.builder()

                                .contentId(item.getContentId())

                                .total(item.getTotal())

                                .build()

                )

                .toList();

    }

    @Override
    public List<TopContentDTO> getTopWatchlistedMovies() {

        Aggregation aggregation =
                Aggregation.newAggregation(

                        Aggregation.group("contentId")
                                .count()
                                .as("total"),

                        Aggregation.project("total")
                                .and("_id")
                                .as("contentId"),

                        Aggregation.sort(
                                Sort.Direction.DESC,
                                "total"
                        ),

                        Aggregation.limit(10)

                );

        AggregationResults<TopContentResult> results =
                mongoTemplate.aggregate(
                        aggregation,
                        "watchlists",
                        TopContentResult.class
                );

        return results.getMappedResults()

                .stream()

                .map(item ->

                        TopContentDTO.builder()

                                .contentId(item.getContentId())

                                .total(item.getTotal())

                                .build()

                )

                .toList();

    }

    
    private long getRevenueSince(Instant instant) {

        Aggregation aggregation = Aggregation.newAggregation(

                Aggregation.match(
                        Criteria.where("status")
                                .is(PaymentStatus.PAID)
                                .and("paidAt")
                                .gte(instant)
                ),

                Aggregation.group()
                        .sum("amount")
                        .as("totalRevenue")
        );

        AggregationResults<RevenueResult> result =
                mongoTemplate.aggregate(
                        aggregation,
                        "payments",
                        RevenueResult.class
                );

        RevenueResult revenue =
                result.getUniqueMappedResult();

        return revenue == null
                ? 0L
                : revenue.getTotalRevenue();
    }
    
    
    private long getTotalRevenue() {

        Aggregation aggregation = Aggregation.newAggregation(

                Aggregation.match(
                        Criteria.where("status")
                                .is(PaymentStatus.PAID)
                ),

                Aggregation.group()
                        .sum("amount")
                        .as("totalRevenue")
        );

        AggregationResults<RevenueResult> result =
                mongoTemplate.aggregate(
                        aggregation,
                        "payments",
                        RevenueResult.class
                );

        RevenueResult revenue =
                result.getUniqueMappedResult();

        return revenue == null
                ? 0L
                : revenue.getTotalRevenue();
    }
    
    
    private long getAveragePaymentAmount() {

        Aggregation aggregation = Aggregation.newAggregation(

                Aggregation.match(
                        Criteria.where("status")
                                .is(PaymentStatus.PAID)
                ),

                Aggregation.group()
                        .avg("amount")
                        .as("average")
        );

        AggregationResults<AverageRevenueResult> result =
                mongoTemplate.aggregate(
                        aggregation,
                        "payments",
                        AverageRevenueResult.class
                );

        AverageRevenueResult average =
                result.getUniqueMappedResult();

        return average == null
                ? 0
                : Math.round(average.getAverage());
    }
}