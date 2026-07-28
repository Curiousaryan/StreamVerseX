package com.streamversex.backend.externalapi.anilist.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AniListRecommendationConnectionDTO {

    private List<AniListRecommendationDTO> nodes;
}