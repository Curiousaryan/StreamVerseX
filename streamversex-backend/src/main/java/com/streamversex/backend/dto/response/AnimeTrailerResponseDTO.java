package com.streamversex.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnimeTrailerResponseDTO {

    private String id;

    private String site;

    private String thumbnailUrl;

    private String videoUrl;
}