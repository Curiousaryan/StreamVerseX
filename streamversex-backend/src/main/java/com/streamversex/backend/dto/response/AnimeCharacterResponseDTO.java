package com.streamversex.backend.dto.response;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AnimeCharacterResponseDTO {

    private Long id;

    private String name;

    private String nativeName;

    private String role;

    private String imageUrl;

    private String siteUrl;

    private List<VoiceActorResponseDTO> voiceActors;
}