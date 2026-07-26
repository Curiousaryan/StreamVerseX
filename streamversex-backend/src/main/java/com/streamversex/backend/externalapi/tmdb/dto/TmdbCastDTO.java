package com.streamversex.backend.externalapi.tmdb.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class TmdbCastDTO {

    private Long id;

    private String name;

    private String character;

    @JsonProperty("profile_path")
    private String profilePath;

    private Integer order;
}