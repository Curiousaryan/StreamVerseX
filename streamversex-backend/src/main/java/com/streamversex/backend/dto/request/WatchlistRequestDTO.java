package com.streamversex.backend.dto.request;

import com.streamversex.backend.model.ContentType;
import com.streamversex.backend.model.WatchStatus;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WatchlistRequestDTO {

    @NotNull(message = "Content type is required")
    private ContentType contentType;

    @NotNull(message = "Content ID is required")
    private Long contentId;

    @NotBlank(message = "Title is required")
    private String title;

    private String posterUrl;

    private WatchStatus status;
}