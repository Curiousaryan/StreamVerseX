package com.streamversex.backend.externalapi.anilist.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AniListMediaDTO {

    private Long id;

    private AniListTitleDTO title;

    private String description;

    private String format;

    private String status;

    private Integer episodes;

    private Integer duration;

    private Integer averageScore;

    private Integer meanScore;

    private Integer popularity;

    private Integer favourites;

    private String season;

    private Integer seasonYear;

    private List<String> genres;

    private AniListCoverImageDTO coverImage;

    private String bannerImage;

    private String siteUrl;
    

    // ==================== DETAILS ====================

    private String source;

    private String countryOfOrigin;

    private AniListDateDTO startDate;

    private AniListDateDTO endDate;

    private List<String> synonyms;

    private AniListTrailerDTO trailer;

    private AniListStudioConnectionDTO studios;
    
    private AniListCharacterConnectionDTO characters;
    
    private AniListRecommendationConnectionDTO recommendations;
}