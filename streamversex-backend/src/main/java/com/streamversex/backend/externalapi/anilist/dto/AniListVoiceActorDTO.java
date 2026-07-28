package com.streamversex.backend.externalapi.anilist.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AniListVoiceActorDTO {

    private Long id;

    private AniListStaffNameDTO name;

    private AniListStaffImageDTO image;

    private String languageV2;

    private String siteUrl;
}