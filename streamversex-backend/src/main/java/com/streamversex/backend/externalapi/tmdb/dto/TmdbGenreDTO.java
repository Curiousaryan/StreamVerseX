package com.streamversex.backend.externalapi.tmdb.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TmdbGenreDTO {

    private Integer id;
    private String name;
}