package com.streamversex.backend.externalapi.anilist.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AniListCharacterDTO {

    private Long id;

    private AniListCharacterNameDTO name;

    private AniListCharacterImageDTO image;

    private String siteUrl;
}