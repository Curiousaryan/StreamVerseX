package com.streamversex.backend.mapper;

import org.springframework.stereotype.Component;

import com.streamversex.backend.dto.response.ReviewResponseDTO;
import com.streamversex.backend.model.Review;

@Component
public class ReviewMapper {

    public ReviewResponseDTO toResponseDTO(Review review) {

        if (review == null) {
            return null;
        }

        return ReviewResponseDTO.builder()
                .id(review.getId())
                .contentType(review.getContentType())
                .contentId(review.getContentId())
                .rating(review.getRating())
                .reviewText(review.getReviewText())
                .createdAt(review.getCreatedAt())
                .updatedAt(review.getUpdatedAt())
                .build();
    }
}