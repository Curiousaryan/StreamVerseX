package com.streamversex.backend.externalapi.anilist.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AniListCoverImageDTO {

    private String extraLarge;
    private String large;
    private String medium;
}