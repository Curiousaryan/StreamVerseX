package com.streamversex.backend.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnimeResponseDTO {

    private Long id;

    private String title;
    private String englishTitle;

    private String description;

    private String format;
    private String status;

    private Integer episodes;

    private Integer averageScore;

    private Integer popularity;

    private List<String> genres;

    private String coverImageUrl;
    private String bannerImageUrl;
}