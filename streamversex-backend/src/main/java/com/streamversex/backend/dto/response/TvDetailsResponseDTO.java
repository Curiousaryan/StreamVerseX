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
public class TvDetailsResponseDTO {

    private Long id;

    private String name;

    private String originalName;

    private String overview;

    private String tagline;

    private String posterUrl;

    private String backdropUrl;

    private String firstAirDate;

    private String lastAirDate;

    private String status;

    private Integer numberOfSeasons;

    private Integer numberOfEpisodes;

    private List<Integer> episodeRunTime;

    private Double rating;

    private Integer voteCount;

    private String originalLanguage;

    private List<String> originCountry;

    private List<String> genres;

    private List<NetworkResponseDTO> networks;

    private List<SeasonResponseDTO> seasons;
}