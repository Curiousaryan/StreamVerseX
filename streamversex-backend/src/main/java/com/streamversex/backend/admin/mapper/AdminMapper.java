package com.streamversex.backend.admin.mapper;

import org.springframework.stereotype.Component;

import com.streamversex.backend.admin.dto.response.AdminPaymentResponseDTO;
import com.streamversex.backend.admin.dto.response.AdminReviewResponseDTO;
import com.streamversex.backend.admin.dto.response.AdminUserResponseDTO;
import com.streamversex.backend.model.Payment;
import com.streamversex.backend.model.Review;
import com.streamversex.backend.model.User;

@Component
public class AdminMapper {

    public AdminUserResponseDTO toUserResponse(User user) {

        return AdminUserResponseDTO.builder()
                .id(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .blocked(user.isBlocked())
                .premium(user.isPremium())
                .subscriptionPlan(user.getSubscriptionPlan())
                .subscriptionExpiresAt(user.getSubscriptionExpiresAt())
                .createdAt(user.getCreatedAt())
                .build();
    }
    
    
    public AdminReviewResponseDTO toReviewResponse(
            Review review) {

        return AdminReviewResponseDTO.builder()
                .id(review.getId())
                .userId(review.getUserId())
                .contentType(review.getContentType())
                .contentId(review.getContentId())
                .rating(review.getRating())
                .reviewText(review.getReviewText())
                .createdAt(review.getCreatedAt())
                .updatedAt(review.getUpdatedAt())
                .build();
    }
    
    
    public AdminPaymentResponseDTO toPaymentResponse(
            Payment payment) {

        return AdminPaymentResponseDTO.builder()

                .id(payment.getId())

                .userId(payment.getUserId())

                .razorpayOrderId(
                        payment.getRazorpayOrderId()
                )

                .razorpayPaymentId(
                        payment.getRazorpayPaymentId()
                )

                .plan(payment.getPlan())

                .amount(payment.getAmount())

                .currency(payment.getCurrency())

                .status(payment.getStatus())

                .createdAt(payment.getCreatedAt())

                .paidAt(payment.getPaidAt())

                .build();
    }

}