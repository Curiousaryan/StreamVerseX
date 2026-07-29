package com.streamversex.backend.model;

import java.time.LocalDateTime;

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
@Document(collection = "favorites")
@CompoundIndex(
        name = "unique_user_content_favorite",
        def = "{'userId': 1, 'contentType': 1, 'contentId': 1}",
        unique = true
)
public class Favorite {

    @Id
    private String id;

    private String userId;

    private ContentType contentType;

    private Long contentId;

    private String title;

    private String posterUrl;

    private LocalDateTime createdAt;
}