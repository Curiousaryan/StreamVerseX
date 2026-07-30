package com.streamversex.backend.model;

import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.CompoundIndex;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "reviews")
@CompoundIndex(
        name = "unique_user_content_review",
        def = "{'userId': 1, 'contentType': 1, 'contentId': 1}",
        unique = true
)
public class Review {

    @Id
    private String id;

    private String userId;

    private ContentType contentType;

    private Long contentId;

    private Integer rating;

    private String reviewText;

    private Instant createdAt;

    private Instant updatedAt;
}