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
public class MovieDetailsResponseDTO {

    private Long id;

    private String title;
    private String originalTitle;

    private String overview;
    private String tagline;

    private String posterUrl;
    private String backdropUrl;

    private String releaseDate;

    private Integer runtime;
    private String status;

    private Double rating;
    private Integer voteCount;

    private String originalLanguage;
    private String imdbId;

    private List<String> genres;
}