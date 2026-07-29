package com.streamversex.backend.dto.response;

import java.time.Instant;

import com.streamversex.backend.model.ContentType;
import com.streamversex.backend.model.WatchStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class WatchlistResponseDTO {

    private String id;

    private ContentType contentType;

    private Long contentId;

    private String title;

    private String posterUrl;

    private WatchStatus status;

    private Instant createdAt;

    private Instant updatedAt;
}