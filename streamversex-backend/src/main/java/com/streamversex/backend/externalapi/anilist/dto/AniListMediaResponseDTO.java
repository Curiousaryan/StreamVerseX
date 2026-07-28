package com.streamversex.backend.externalapi.anilist.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AniListMediaResponseDTO {

    private AniListMediaDataDTO data;
}