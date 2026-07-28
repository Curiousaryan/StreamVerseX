package com.streamversex.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class VoiceActorResponseDTO {

    private Long id;

    private String name;

    private String nativeName;

    private String language;

    private String imageUrl;

    private String siteUrl;
}