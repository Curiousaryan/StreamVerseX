package com.streamversex.backend.service;

import java.util.List;

import com.streamversex.backend.dto.request.FavoriteRequestDTO;
import com.streamversex.backend.dto.response.FavoriteResponseDTO;
import com.streamversex.backend.model.ContentType;

public interface FavoriteService {

    FavoriteResponseDTO addFavorite(
            String userId,
            FavoriteRequestDTO request);

    List<FavoriteResponseDTO> getFavorites(
            String userId);

    void removeFavorite(
            String userId,
            ContentType contentType,
            Long contentId);

    boolean isFavorite(
            String userId,
            ContentType contentType,
            Long contentId);
}