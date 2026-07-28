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
public class AnimeDetailsResponseDTO {

    private Long id;

    private String title;

    private String englishTitle;

    private String nativeTitle;

    private List<String> synonyms;

    private String description;

    private String format;

    private String status;

    private String source;

    private Integer episodes;

    private Integer duration;

    private Integer averageScore;

    private Integer meanScore;

    private Integer popularity;

    private Integer favourites;

    private String season;

    private Integer seasonYear;

    private String countryOfOrigin;

    private List<String> genres;

    private String startDate;

    private String endDate;

    private String coverImageUrl;

    private String bannerImageUrl;

    private String siteUrl;

    private List<StudioResponseDTO> studios;

    private AnimeTrailerResponseDTO trailer;
}