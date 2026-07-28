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
public class TvResponseDTO {

    private Long id;

    private String name;

    private String overview;

    private String posterUrl;

    private String backdropUrl;

    private String firstAirDate;

    private Double rating;

    private Integer voteCount;

    private List<Integer> genreIds;
}