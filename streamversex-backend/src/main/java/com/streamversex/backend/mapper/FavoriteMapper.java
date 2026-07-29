package com.streamversex.backend.mapper;

import org.springframework.stereotype.Component;

import com.streamversex.backend.dto.response.FavoriteResponseDTO;
import com.streamversex.backend.model.Favorite;

@Component
public class FavoriteMapper {

    public FavoriteResponseDTO toResponseDTO(Favorite favorite) {

        if (favorite == null) {
            return null;
        }

        return FavoriteResponseDTO.builder()
                .id(favorite.getId())
                .contentType(favorite.getContentType())
                .contentId(favorite.getContentId())
                .title(favorite.getTitle())
                .posterUrl(favorite.getPosterUrl())
                .createdAt(favorite.getCreatedAt())
                .build();
    }
}