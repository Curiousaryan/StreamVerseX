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
public class MovieCreditsResponseDTO {

    private Long movieId;

    private List<CastResponseDTO> cast;

    private List<CrewResponseDTO> crew;
}