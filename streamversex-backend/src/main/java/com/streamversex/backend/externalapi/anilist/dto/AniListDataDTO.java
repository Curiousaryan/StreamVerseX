package com.streamversex.backend.externalapi.anilist.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class AniListDataDTO {

    @JsonProperty("Page")
    private AniListPageDTO page;
}