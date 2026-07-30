package com.streamversex.backend.service;

import java.util.List;

import com.streamversex.backend.dto.request.ReviewRequestDTO;
import com.streamversex.backend.dto.request.ReviewUpdateRequestDTO;
import com.streamversex.backend.dto.response.RatingSummaryResponseDTO;
import com.streamversex.backend.dto.response.ReviewResponseDTO;
import com.streamversex.backend.model.ContentType;

public interface ReviewService {

    ReviewResponseDTO createReview(
            String userId,
            ReviewRequestDTO request);

    List<ReviewResponseDTO> getContentReviews(
            ContentType contentType,
            Long contentId);

    List<ReviewResponseDTO> getMyReviews(
            String userId);

    ReviewResponseDTO getMyReviewForContent(
            String userId,
            ContentType contentType,
            Long contentId);

    ReviewResponseDTO updateReview(
            String userId,
            String reviewId,
            ReviewUpdateRequestDTO request);

    void deleteReview(
            String userId,
            String reviewId);

    RatingSummaryResponseDTO getRatingSummary(
            ContentType contentType,
            Long contentId);
}