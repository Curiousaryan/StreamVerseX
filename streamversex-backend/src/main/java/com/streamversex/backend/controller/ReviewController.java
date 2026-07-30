package com.streamversex.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.streamversex.backend.dto.request.ReviewRequestDTO;
import com.streamversex.backend.dto.request.ReviewUpdateRequestDTO;
import com.streamversex.backend.dto.response.RatingSummaryResponseDTO;
import com.streamversex.backend.dto.response.ReviewResponseDTO;
import com.streamversex.backend.model.ContentType;
import com.streamversex.backend.security.CustomUserDetails;
import com.streamversex.backend.service.ReviewService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
public class ReviewController {

    private final ReviewService reviewService;


    // ==================== CREATE ====================

    @PostMapping
    public ResponseEntity<ReviewResponseDTO> createReview(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody ReviewRequestDTO request) {

        ReviewResponseDTO response =
                reviewService.createReview(
                        userDetails.getId(),
                        request
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }


    // ==================== CONTENT REVIEWS ====================

    @GetMapping("/{contentType}/{contentId}")
    public ResponseEntity<List<ReviewResponseDTO>> getContentReviews(
            @PathVariable ContentType contentType,
            @PathVariable Long contentId) {

        return ResponseEntity.ok(
                reviewService.getContentReviews(
                        contentType,
                        contentId
                )
        );
    }


    // ==================== MY REVIEWS ====================

    @GetMapping("/me")
    public ResponseEntity<List<ReviewResponseDTO>> getMyReviews(
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        return ResponseEntity.ok(
                reviewService.getMyReviews(
                        userDetails.getId()
                )
        );
    }


    // ==================== MY REVIEW FOR CONTENT ====================

    @GetMapping("/me/{contentType}/{contentId}")
    public ResponseEntity<ReviewResponseDTO> getMyReviewForContent(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable ContentType contentType,
            @PathVariable Long contentId) {

        return ResponseEntity.ok(
                reviewService.getMyReviewForContent(
                        userDetails.getId(),
                        contentType,
                        contentId
                )
        );
    }


    // ==================== UPDATE ====================

    @PutMapping("/{reviewId}")
    public ResponseEntity<ReviewResponseDTO> updateReview(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable String reviewId,
            @Valid @RequestBody ReviewUpdateRequestDTO request) {

        return ResponseEntity.ok(
                reviewService.updateReview(
                        userDetails.getId(),
                        reviewId,
                        request
                )
        );
    }


    // ==================== DELETE ====================

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable String reviewId) {

        reviewService.deleteReview(
                userDetails.getId(),
                reviewId
        );

        return ResponseEntity.noContent().build();
    }


    // ==================== RATING SUMMARY ====================

    @GetMapping("/{contentType}/{contentId}/summary")
    public ResponseEntity<RatingSummaryResponseDTO> getRatingSummary(
            @PathVariable ContentType contentType,
            @PathVariable Long contentId) {

        return ResponseEntity.ok(
                reviewService.getRatingSummary(
                        contentType,
                        contentId
                )
        );
    }
}