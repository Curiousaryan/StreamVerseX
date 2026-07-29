package com.streamversex.backend.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.streamversex.backend.dto.request.FavoriteRequestDTO;
import com.streamversex.backend.dto.response.FavoriteResponseDTO;
import com.streamversex.backend.exception.FavoriteAlreadyExistsException;
import com.streamversex.backend.exception.FavoriteNotFoundException;
import com.streamversex.backend.mapper.FavoriteMapper;
import com.streamversex.backend.model.ContentType;
import com.streamversex.backend.model.Favorite;
import com.streamversex.backend.repository.FavoriteRepository;
import com.streamversex.backend.service.FavoriteService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FavoriteServiceImpl implements FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final FavoriteMapper favoriteMapper;


    // ==================== ADD FAVORITE ====================

    @Override
    public FavoriteResponseDTO addFavorite(
            String userId,
            FavoriteRequestDTO request) {

        boolean alreadyExists =
                favoriteRepository
                        .existsByUserIdAndContentTypeAndContentId(
                                userId,
                                request.getContentType(),
                                request.getContentId()
                        );

        if (alreadyExists) {
        	throw new FavoriteAlreadyExistsException(
        	        "Content is already in favorites."
        	);
        }

        Favorite favorite = Favorite.builder()
                .userId(userId)
                .contentType(request.getContentType())
                .contentId(request.getContentId())
                .title(request.getTitle())
                .posterUrl(request.getPosterUrl())
                .createdAt(LocalDateTime.now())
                .build();

        Favorite savedFavorite =
                favoriteRepository.save(favorite);

        return favoriteMapper.toResponseDTO(savedFavorite);
    }


    // ==================== GET FAVORITES ====================

    @Override
    public List<FavoriteResponseDTO> getFavorites(
            String userId) {

        return favoriteRepository
                .findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(favoriteMapper::toResponseDTO)
                .toList();
    }


    // ==================== REMOVE FAVORITE ====================

    @Override
    public void removeFavorite(
            String userId,
            ContentType contentType,
            Long contentId) {

        Favorite favorite =
                favoriteRepository
                        .findByUserIdAndContentTypeAndContentId(
                                userId,
                                contentType,
                                contentId
                        )
                        .orElseThrow(() ->
                        new FavoriteNotFoundException(
                                "Favorite not found."
                        )
                );

        favoriteRepository.delete(favorite);
    }


    // ==================== CHECK FAVORITE ====================

    @Override
    public boolean isFavorite(
            String userId,
            ContentType contentType,
            Long contentId) {

        return favoriteRepository
                .existsByUserIdAndContentTypeAndContentId(
                        userId,
                        contentType,
                        contentId
                );
    }
}