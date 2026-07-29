package com.streamversex.backend.mapper;

import org.springframework.stereotype.Component;

import com.streamversex.backend.dto.response.WatchlistResponseDTO;
import com.streamversex.backend.model.Watchlist;

@Component
public class WatchlistMapper {

    public WatchlistResponseDTO toResponseDTO(
            Watchlist watchlist) {

        if (watchlist == null) {
            return null;
        }

        return WatchlistResponseDTO.builder()
                .id(watchlist.getId())
                .contentType(watchlist.getContentType())
                .contentId(watchlist.getContentId())
                .title(watchlist.getTitle())
                .posterUrl(watchlist.getPosterUrl())
                .status(watchlist.getStatus())
                .createdAt(watchlist.getCreatedAt())
                .updatedAt(watchlist.getUpdatedAt())
                .build();
    }
}