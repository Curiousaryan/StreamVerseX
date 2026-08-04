package com.streamversex.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CompareMoviesRequestDTO {

    @NotBlank
    private String movieOne;

    @NotBlank
    private String movieTwo;
}