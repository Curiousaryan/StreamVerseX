package com.streamversex.backend.service;

import java.util.List;

import com.streamversex.backend.dto.response.AnimeCharacterResponseDTO;
import com.streamversex.backend.dto.response.AnimeDetailsResponseDTO;
import com.streamversex.backend.dto.response.AnimeResponseDTO;

public interface AnimeService {

    List<AnimeResponseDTO> getTrendingAnime();
    
    List<AnimeResponseDTO> getPopularAnime();

    List<AnimeResponseDTO> getTopRatedAnime();
    
    List<AnimeResponseDTO> getSeasonalAnime(
            String season,
            Integer year);

    List<AnimeResponseDTO> getUpcomingAnime();
    
    List<AnimeResponseDTO> searchAnime(String query);
    
    AnimeDetailsResponseDTO getAnimeDetails(Long animeId);
    
    List<AnimeCharacterResponseDTO> getAnimeCharacters(Long animeId);
    
    List<AnimeResponseDTO> getAnimeRecommendations(Long animeId);
}