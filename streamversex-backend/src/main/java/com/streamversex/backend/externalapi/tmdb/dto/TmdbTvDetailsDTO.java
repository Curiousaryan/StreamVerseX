package com.streamversex.backend.externalapi.tmdb.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class TmdbTvDetailsDTO {

    private Long id;

    private String name;

    @JsonProperty("original_name")
    private String originalName;

    private String overview;

    private String tagline;

    @JsonProperty("poster_path")
    private String posterPath;

    @JsonProperty("backdrop_path")
    private String backdropPath;

    @JsonProperty("first_air_date")
    private String firstAirDate;

    @JsonProperty("last_air_date")
    private String lastAirDate;

    private String status;

    @JsonProperty("number_of_seasons")
    private Integer numberOfSeasons;

    @JsonProperty("number_of_episodes")
    private Integer numberOfEpisodes;

    @JsonProperty("episode_run_time")
    private List<Integer> episodeRunTime;

    @JsonProperty("vote_average")
    private Double voteAverage;

    @JsonProperty("vote_count")
    private Integer voteCount;

    @JsonProperty("original_language")
    private String originalLanguage;

    @JsonProperty("origin_country")
    private List<String> originCountry;

    private List<TmdbGenreDTO> genres;

    private List<TmdbNetworkDTO> networks;

    private List<TmdbSeasonDTO> seasons;
}