package com.streamversex.backend.admin.service.impl;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.temporal.ChronoUnit;
import java.util.List;

import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.aggregation.Aggregation;
import org.springframework.data.mongodb.core.aggregation.AggregationResults;
import org.springframework.stereotype.Service;

import com.streamversex.backend.admin.dto.response.AdminDashboardResponseDTO;
import com.streamversex.backend.admin.dto.response.AdminPaymentResponseDTO;
import com.streamversex.backend.admin.dto.response.AdminReviewResponseDTO;
import com.streamversex.backend.admin.dto.response.AdminUserResponseDTO;
import com.streamversex.backend.admin.dto.response.RevenueResult;
import com.streamversex.backend.admin.mapper.AdminMapper;
import com.streamversex.backend.admin.service.AdminService;
import com.streamversex.backend.exception.AdminOperationException;
import com.streamversex.backend.exception.PaymentNotFoundException;
import com.streamversex.backend.exception.ReviewNotFoundException;
import com.streamversex.backend.exception.UserNotFoundException;
import com.streamversex.backend.model.Payment;
import com.streamversex.backend.model.Review;
import com.streamversex.backend.model.Role;
import com.streamversex.backend.model.User;
import com.streamversex.backend.payment.PaymentStatus;
import com.streamversex.backend.repository.FavoriteRepository;
import com.streamversex.backend.repository.PaymentRepository;
import com.streamversex.backend.repository.ReviewRepository;
import com.streamversex.backend.repository.UserRepository;
import com.streamversex.backend.repository.WatchlistRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {
	

    private final UserRepository userRepository;
    private final PaymentRepository paymentRepository;
    private final ReviewRepository reviewRepository;
    private final FavoriteRepository favoriteRepository;
    private final WatchlistRepository watchlistRepository;
    private final MongoTemplate mongoTemplate;
    private final AdminMapper adminMapper;


    @Override
    public AdminDashboardResponseDTO getDashboard() {

        return AdminDashboardResponseDTO.builder()

                // USERS

                .totalUsers(userRepository.count())

                .activeUsers(userRepository.countByIsBlockedFalse())

                .blockedUsers(userRepository.countByIsBlockedTrue())

                .premiumUsers(userRepository.countByIsPremiumTrue())

                // PAYMENTS

                .totalPayments(paymentRepository.count())

                .successfulPayments(
                        paymentRepository.countByStatus(PaymentStatus.PAID)
                )

                .failedPayments(
                        paymentRepository.countByStatus(PaymentStatus.FAILED)
                )

                .totalRevenue(getTotalRevenue())

                .monthlyRevenue(getMonthlyRevenue())

                // CONTENT

                .totalReviews(reviewRepository.count())

                .totalFavorites(favoriteRepository.count())

                .totalWatchlistItems(watchlistRepository.count())

                .build();
    }

    
    private long getTotalRevenue() {

        Aggregation aggregation = Aggregation.newAggregation(

                Aggregation.match(
                        org.springframework.data.mongodb.core.query.Criteria
                                .where("status")
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

        RevenueResult revenue = result.getUniqueMappedResult();

        return revenue == null
                ? 0L
                : revenue.getTotalRevenue();
    }
    
    private long getMonthlyRevenue() {

        LocalDate firstDay =
                LocalDate.now().withDayOfMonth(1);

        Instant start =
                firstDay.atStartOfDay(
                        ZoneId.systemDefault()
                ).toInstant();

        Aggregation aggregation = Aggregation.newAggregation(

                Aggregation.match(
                        org.springframework.data.mongodb.core.query.Criteria
                                .where("status")
                                .is(PaymentStatus.PAID)
                                .and("paidAt")
                                .gte(start)
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

        RevenueResult revenue = result.getUniqueMappedResult();

        return revenue == null
                ? 0L
                : revenue.getTotalRevenue();
    }

    
    @Override
    public List<AdminUserResponseDTO> getAllUsers() {

        return userRepository
                .findAllByOrderByCreatedAtDesc()
                .stream()
                .map(adminMapper::toUserResponse)
                .toList();
    }
    
    
    @Override
    public AdminUserResponseDTO getUserById(String userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found."));

        return adminMapper.toUserResponse(user);
    }
    
    
    @Override
    public List<AdminUserResponseDTO> searchUsers(String keyword) {

        return userRepository
                .findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
                        keyword,
                        keyword
                )
                .stream()
                .map(adminMapper::toUserResponse)
                .toList();
    }
    
    @Override
    public void blockUser(
            String adminId,
            String userId) {

        if (adminId.equals(userId)) {
            throw new AdminOperationException(
                    "You cannot block your own account."
            );
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found."));

        if (user.getRole() == Role.ADMIN) {
            throw new AdminOperationException(
                    "Admin account cannot be blocked."
            );
        }

        user.setBlocked(true);

        userRepository.save(user);
    }
    
    
    @Override
    public void unblockUser(
            String adminId,
            String userId) {

        if (adminId.equals(userId)) {
            throw new AdminOperationException(
                    "You cannot unblock your own account."
            );
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found."));

        user.setBlocked(false);

        userRepository.save(user);
    }
    
    
    @Override
    public List<AdminReviewResponseDTO> getAllReviews() {

        return reviewRepository
                .findAllByOrderByCreatedAtDesc()
                .stream()
                .map(adminMapper::toReviewResponse)
                .toList();
    }
    
    
    @Override
    public List<AdminReviewResponseDTO> searchReviews(
            String keyword) {

        return reviewRepository
                .findByReviewTextContainingIgnoreCaseOrderByCreatedAtDesc(
                        keyword
                )
                .stream()
                .map(adminMapper::toReviewResponse)
                .toList();
    }
    
    
    @Override
    public void deleteReview(
            String reviewId) {

        Review review = reviewRepository
                .findById(reviewId)
                .orElseThrow(() ->
                        new ReviewNotFoundException(
                                "Review not found."
                        ));

        reviewRepository.delete(review);
    }
    
    
    @Override
    public List<AdminPaymentResponseDTO> getAllPayments() {

        return paymentRepository
                .findAllByOrderByCreatedAtDesc()
                .stream()
                .map(adminMapper::toPaymentResponse)
                .toList();
    }
    
    
    @Override
    public AdminPaymentResponseDTO getPayment(
            String paymentId) {

        Payment payment = paymentRepository
                .findById(paymentId)
                .orElseThrow(() ->
                        new PaymentNotFoundException(
                                "Payment not found."
                        ));

        return adminMapper.toPaymentResponse(payment);
    }
    
    
    @Override
    public List<AdminPaymentResponseDTO> searchPayments(
            String keyword) {

        return paymentRepository
                .findByRazorpayOrderIdContainingIgnoreCaseOrRazorpayPaymentIdContainingIgnoreCaseOrderByCreatedAtDesc(
                        keyword,
                        keyword
                )
                .stream()
                .map(adminMapper::toPaymentResponse)
                .toList();
    }
    
    
    @Override
    public List<AdminPaymentResponseDTO> getPaymentsByStatus(
            PaymentStatus status) {

        return paymentRepository
                .findByStatusOrderByCreatedAtDesc(status)
                .stream()
                .map(adminMapper::toPaymentResponse)
                .toList();
    }
    
    @Override
    public List<AdminUserResponseDTO> getPremiumUsers() {

        return userRepository
                .findByIsPremiumTrueOrderBySubscriptionExpiresAtAsc()
                .stream()
                .map(adminMapper::toUserResponse)
                .toList();
    }
    
    
    @Override
    public List<AdminUserResponseDTO> searchPremiumUsers(
            String keyword) {

        return userRepository
                .findByIsPremiumTrueAndNameContainingIgnoreCaseOrIsPremiumTrueAndEmailContainingIgnoreCase(
                        keyword,
                        keyword
                )
                .stream()
                .map(adminMapper::toUserResponse)
                .toList();
    }
    
    
    @Override
    public List<AdminUserResponseDTO> getExpiringPremiumUsers() {

        Instant nextSevenDays =
                Instant.now().plus(7, ChronoUnit.DAYS);

        return userRepository
                .findByIsPremiumTrueAndSubscriptionExpiresAtBefore(
                        nextSevenDays
                )
                .stream()
                .map(adminMapper::toUserResponse)
                .toList();
    }
    
    @Override
    public void expirePremiumUser(
            String userId) {

        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new UserNotFoundException(
                                "User not found."
                        ));

        user.setPremium(false);

        user.setSubscriptionPlan(null);

        user.setSubscriptionStartedAt(null);

        user.setSubscriptionExpiresAt(null);

        userRepository.save(user);
    }
}