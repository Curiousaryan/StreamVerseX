package com.streamversex.backend.service.impl;

import java.time.Instant;
import java.util.List;

import org.springframework.stereotype.Service;

import com.streamversex.backend.dto.request.ReviewRequestDTO;
import com.streamversex.backend.dto.request.ReviewUpdateRequestDTO;
import com.streamversex.backend.dto.response.RatingSummaryResponseDTO;
import com.streamversex.backend.dto.response.ReviewResponseDTO;
import com.streamversex.backend.exception.ReviewAccessDeniedException;
import com.streamversex.backend.exception.ReviewAlreadyExistsException;
import com.streamversex.backend.exception.ReviewNotFoundException;
import com.streamversex.backend.mapper.ReviewMapper;
import com.streamversex.backend.model.ContentType;
import com.streamversex.backend.model.Review;
import com.streamversex.backend.repository.ReviewRepository;
import com.streamversex.backend.service.ReviewService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewServiceImpl implements ReviewService {

    private final ReviewRepository reviewRepository;
    private final ReviewMapper reviewMapper;


    // ==================== CREATE ====================

    @Override
    public ReviewResponseDTO createReview(
            String userId,
            ReviewRequestDTO request) {

        boolean alreadyExists =
                reviewRepository
                        .existsByUserIdAndContentTypeAndContentId(
                                userId,
                                request.getContentType(),
                                request.getContentId()
                        );

        if (alreadyExists) {
            throw new ReviewAlreadyExistsException(
                    "You have already reviewed this content."
            );
        }

        Instant now = Instant.now();

        Review review = Review.builder()
                .userId(userId)
                .contentType(request.getContentType())
                .contentId(request.getContentId())
                .rating(request.getRating())
                .reviewText(request.getReviewText())
                .createdAt(now)
                .updatedAt(now)
                .build();

        Review saved =
                reviewRepository.save(review);

        return reviewMapper.toResponseDTO(saved);
    }


    // ==================== CONTENT REVIEWS ====================

    @Override
    public List<ReviewResponseDTO> getContentReviews(
            ContentType contentType,
            Long contentId) {

        return reviewRepository
                .findByContentTypeAndContentIdOrderByCreatedAtDesc(
                        contentType,
                        contentId
                )
                .stream()
                .map(reviewMapper::toResponseDTO)
                .toList();
    }


    // ==================== MY REVIEWS ====================

    @Override
    public List<ReviewResponseDTO> getMyReviews(
            String userId) {

        return reviewRepository
                .findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(reviewMapper::toResponseDTO)
                .toList();
    }


    // ==================== MY REVIEW FOR CONTENT ====================

    @Override
    public ReviewResponseDTO getMyReviewForContent(
            String userId,
            ContentType contentType,
            Long contentId) {

        Review review =
                reviewRepository
                        .findByUserIdAndContentTypeAndContentId(
                                userId,
                                contentType,
                                contentId
                        )
                        .orElseThrow(() ->
                        new ReviewNotFoundException(
                                "Review not found."
                        )
                );

        return reviewMapper.toResponseDTO(review);
    }


    // ==================== UPDATE ====================

    @Override
    public ReviewResponseDTO updateReview(
            String userId,
            String reviewId,
            ReviewUpdateRequestDTO request) {

        Review review =
                reviewRepository.findById(reviewId)
                        .orElseThrow(() ->
                                new ReviewNotFoundException(
                                        "Review not found."
                                )
                        );

        validateOwnership(review, userId);

        review.setRating(request.getRating());
        review.setReviewText(request.getReviewText());
        review.setUpdatedAt(Instant.now());

        Review updated =
                reviewRepository.save(review);

        return reviewMapper.toResponseDTO(updated);
    }


    // ==================== DELETE ====================

    @Override
    public void deleteReview(
            String userId,
            String reviewId) {

        Review review =
                reviewRepository.findById(reviewId)
		                .orElseThrow(() ->
		                new ReviewNotFoundException(
		                        "Review not found."
		                )
		        );

        validateOwnership(review, userId);

        reviewRepository.delete(review);
    }


    // ==================== RATING SUMMARY ====================

    @Override
    public RatingSummaryResponseDTO getRatingSummary(
            ContentType contentType,
            Long contentId) {

        List<Review> reviews =
                reviewRepository
                        .findByContentTypeAndContentIdOrderByCreatedAtDesc(
                                contentType,
                                contentId
                        );

        long totalReviews = reviews.size();

        double averageRating =
                reviews.stream()
                        .mapToInt(Review::getRating)
                        .average()
                        .orElse(0.0);

        // Keep API output clean: 8.6666 -> 8.67
        averageRating =
                Math.round(averageRating * 100.0) / 100.0;

        return RatingSummaryResponseDTO.builder()
                .contentType(contentType)
                .contentId(contentId)
                .averageRating(averageRating)
                .totalReviews(totalReviews)
                .build();
    }


    // ==================== OWNERSHIP CHECK ====================

    private void validateOwnership(
            Review review,
            String userId) {

        if (!review.getUserId().equals(userId)) {

            throw new ReviewAccessDeniedException(
                    "You are not allowed to modify this review."
            );
        }
    }
}