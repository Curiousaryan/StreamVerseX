package com.streamversex.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AnimeRecommendationRequestDTO {

    @NotBlank
    private String animeTitle;
}