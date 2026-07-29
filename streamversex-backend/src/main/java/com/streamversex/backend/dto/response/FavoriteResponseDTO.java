package com.streamversex.backend.dto.response;

import java.time.LocalDateTime;

import com.streamversex.backend.model.ContentType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteResponseDTO {

    private String id;

    private ContentType contentType;

    private Long contentId;

    private String title;

    private String posterUrl;

    private LocalDateTime createdAt;
}