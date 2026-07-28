package com.streamversex.backend.externalapi.anilist.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AniListStudioDTO {

    private Long id;
    private String name;
    private Boolean isAnimationStudio;
    private String siteUrl;
}