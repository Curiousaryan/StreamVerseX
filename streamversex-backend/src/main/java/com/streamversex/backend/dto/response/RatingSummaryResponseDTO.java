package com.streamversex.backend.dto.response;

import com.streamversex.backend.model.ContentType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RatingSummaryResponseDTO {

    private ContentType contentType;

    private Long contentId;

    private double averageRating;

    private long totalReviews;
}