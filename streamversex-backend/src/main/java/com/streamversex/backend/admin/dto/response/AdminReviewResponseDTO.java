package com.streamversex.backend.admin.dto.response;

import java.time.Instant;

import com.streamversex.backend.model.ContentType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AdminReviewResponseDTO {

    private String id;

    private String userId;

    private ContentType contentType;

    private Long contentId;

    private Integer rating;

    private String reviewText;

    private Instant createdAt;

    private Instant updatedAt;

}