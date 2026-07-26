package com.streamversex.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VideoResponseDTO {

    private String id;

    private String name;

    private String key;

    private String site;

    private String type;

    private Boolean official;

    private String videoUrl;
}