package com.streamversex.backend.service.impl;

import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;

import com.streamversex.backend.dto.response.AnimeCharacterResponseDTO;
import com.streamversex.backend.dto.response.AnimeDetailsResponseDTO;
import com.streamversex.backend.dto.response.AnimeResponseDTO;
import com.streamversex.backend.externalapi.anilist.client.AniListClient;
import com.streamversex.backend.externalapi.anilist.dto.AniListMediaResponseDTO;
import com.streamversex.backend.externalapi.anilist.dto.AniListResponseDTO;
import com.streamversex.backend.mapper.AnimeMapper;
import com.streamversex.backend.service.AnimeService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AnimeServiceImpl implements AnimeService {

    private final AniListClient aniListClient;
    private final AnimeMapper animeMapper;


    // ==================== TRENDING ====================

    @Override
    public List<AnimeResponseDTO> getTrendingAnime() {

        return mapAnimeList(
                aniListClient.getTrendingAnime()
        );
    }


    // ==================== POPULAR ====================

    @Override
    public List<AnimeResponseDTO> getPopularAnime() {

        return mapAnimeList(
                aniListClient.getPopularAnime()
        );
    }


    // ==================== TOP RATED ====================

    @Override
    public List<AnimeResponseDTO> getTopRatedAnime() {

        return mapAnimeList(
                aniListClient.getTopRatedAnime()
        );
    }


    // ==================== COMMON MAPPER ====================

    private List<AnimeResponseDTO> mapAnimeList(
            AniListResponseDTO response) {

        if (response == null
                || response.getData() == null
                || response.getData().getPage() == null
                || response.getData().getPage().getMedia() == null) {

            return Collections.emptyList();
        }

        return response.getData()
                .getPage()
                .getMedia()
                .stream()
                .map(animeMapper::toResponseDTO)
                .toList();
    }
    
    @Override
    public List<AnimeResponseDTO> getSeasonalAnime(
            String season,
            Integer year) {

        return mapAnimeList(
                aniListClient.getSeasonalAnime(
                        season,
                        year)
        );
    }
    
    @Override
    public List<AnimeResponseDTO> getUpcomingAnime() {

        return mapAnimeList(
                aniListClient.getUpcomingAnime()
        );
    }
    
 // ==================== SEARCH ====================

    @Override
    public List<AnimeResponseDTO> searchAnime(String query) {

        if (query == null || query.isBlank()) {
            return Collections.emptyList();
        }

        return mapAnimeList(
                aniListClient.searchAnime(query.trim())
        );
    }
    
    @Override
    public AnimeDetailsResponseDTO getAnimeDetails(Long animeId) {

        AniListMediaResponseDTO response =
                aniListClient.getAnimeDetails(animeId);

        if (response == null
                || response.getData() == null
                || response.getData().getMedia() == null) {

            throw new RuntimeException("Anime not found.");
        }

        return animeMapper.toDetailsResponseDTO(
                response.getData().getMedia()
        );
    }
    
 // ==================== ANIME CHARACTERS ====================

    @Override
    public List<AnimeCharacterResponseDTO> getAnimeCharacters(
            Long animeId) {

        AniListMediaResponseDTO response =
                aniListClient.getAnimeCharacters(animeId);

        if (response == null
                || response.getData() == null
                || response.getData().getMedia() == null) {

            return Collections.emptyList();
        }

        return animeMapper.toCharacterResponseDTOs(
                response.getData().getMedia()
        );
    }
    
 // ==================== ANIME RECOMMENDATIONS ====================

    @Override
    public List<AnimeResponseDTO> getAnimeRecommendations(
            Long animeId) {

        AniListMediaResponseDTO response =
                aniListClient.getAnimeRecommendations(animeId);

        if (response == null
                || response.getData() == null
                || response.getData().getMedia() == null) {

            return Collections.emptyList();
        }

        return animeMapper.toRecommendationResponseDTOs(
                response.getData().getMedia()
        );
    }
    
}