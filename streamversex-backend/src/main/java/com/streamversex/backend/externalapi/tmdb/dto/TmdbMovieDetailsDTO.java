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
public class TmdbMovieDetailsDTO {

    private Long id;

    private String title;

    @JsonProperty("original_title")
    private String originalTitle;

    private String overview;

    private String tagline;

    @JsonProperty("poster_path")
    private String posterPath;

    @JsonProperty("backdrop_path")
    private String backdropPath;

    @JsonProperty("release_date")
    private String releaseDate;

    private Integer runtime;

    private String status;

    @JsonProperty("vote_average")
    private Double voteAverage;

    @JsonProperty("vote_count")
    private Integer voteCount;

    private Double popularity;

    @JsonProperty("original_language")
    private String originalLanguage;

    @JsonProperty("imdb_id")
    private String imdbId;

    private Boolean adult;

    private List<TmdbGenreDTO> genres;
}