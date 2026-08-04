package com.streamversex.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class MovieSummaryRequestDTO {

    @NotBlank
    private String movieTitle;
}