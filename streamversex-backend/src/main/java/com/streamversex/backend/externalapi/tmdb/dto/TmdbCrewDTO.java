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
public class TmdbCrewDTO {

    private Long id;

    private String name;

    private String job;

    private String department;

    @JsonProperty("profile_path")
    private String profilePath;
}