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
public class MovieResponseDTO {

    private Long id;
    private String title;
    private String overview;

    private String posterUrl;
    private String backdropUrl;

    private String releaseDate;

    private Double rating;
    private Integer voteCount;

    private List<Integer> genreIds;
}