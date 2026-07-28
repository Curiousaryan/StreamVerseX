package com.streamversex.backend.externalapi.tmdb.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class TmdbSeasonDTO {

    private Long id;

    private String name;

    private String overview;

    @JsonProperty("season_number")
    private Integer seasonNumber;

    @JsonProperty("episode_count")
    private Integer episodeCount;

    @JsonProperty("air_date")
    private String airDate;

    @JsonProperty("poster_path")
    private String posterPath;

    @JsonProperty("vote_average")
    private Double voteAverage;
}