package com.streamversex.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SeasonResponseDTO {

    private Long id;

    private String name;

    private String overview;

    private Integer seasonNumber;

    private Integer episodeCount;

    private String airDate;

    private String posterUrl;

    private Double rating;
}