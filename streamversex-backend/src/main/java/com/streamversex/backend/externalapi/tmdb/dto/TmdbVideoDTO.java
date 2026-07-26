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
public class TmdbVideoDTO {

    private String id;

    private String name;

    private String key;

    private String site;

    private String type;

    private Boolean official;

    private Integer size;

    @JsonProperty("published_at")
    private String publishedAt;
}