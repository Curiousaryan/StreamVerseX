package com.streamversex.backend.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.streamversex.backend.dto.request.ReviewRequestDTO;
import com.streamversex.backend.dto.request.ReviewUpdateRequestDTO;
import com.streamversex.backend.dto.response.RatingSummaryResponseDTO;
import com.streamversex.backend.dto.response.ReviewResponseDTO;
import com.streamversex.backend.model.ContentType;
import com.streamversex.backend.security.CustomUserDetails;
import com.streamversex.backend.service.ReviewService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/reviews")
@RequiredArgsConstructor
@Tag(
        name = "Reviews",
        description = "Create, update, delete and retrieve movie, TV show and anime reviews."
)
public class ReviewController {

    private final ReviewService reviewService;

    // ==================== CREATE ====================

    @Operation(
            summary = "Create Review",
            description = "Creates a review for a movie, TV show or anime."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Review created successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
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

    @Operation(
            summary = "Get Content Reviews",
            description = "Returns all reviews for the specified content."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Reviews retrieved successfully")
    })
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

    @Operation(
            summary = "Get My Reviews",
            description = "Returns all reviews created by the authenticated user."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Reviews retrieved successfully")
    })
    @GetMapping("/me")
    public ResponseEntity<List<ReviewResponseDTO>> getMyReviews(
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        return ResponseEntity.ok(
                reviewService.getMyReviews(
                        userDetails.getId()
                )
        );
    }

    // ==================== MY REVIEW ====================

    @Operation(
            summary = "Get My Review",
            description = "Returns the authenticated user's review for a specific content item."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Review retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "Review not found")
    })
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

    @Operation(
            summary = "Update Review",
            description = "Updates an existing review created by the authenticated user."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Review updated successfully"),
            @ApiResponse(responseCode = "404", description = "Review not found")
    })
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

    @Operation(
            summary = "Delete Review",
            description = "Deletes a review created by the authenticated user."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Review deleted successfully"),
            @ApiResponse(responseCode = "404", description = "Review not found")
    })
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

    @Operation(
            summary = "Get Rating Summary",
            description = "Returns the average rating, total reviews and rating statistics for a content item."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Rating summary retrieved successfully")
    })
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