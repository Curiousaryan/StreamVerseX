package com.streamversex.backend.service;

import java.util.List;

import com.streamversex.backend.dto.response.GenreResponseDTO;
import com.streamversex.backend.dto.response.TvCreditsResponseDTO;
import com.streamversex.backend.dto.response.TvDetailsResponseDTO;
import com.streamversex.backend.dto.response.TvResponseDTO;
import com.streamversex.backend.dto.response.VideoResponseDTO;

public interface TvService {

    List<TvResponseDTO> getTrendingTvShows();
    
    List<TvResponseDTO> getPopularTvShows();

    List<TvResponseDTO> getTopRatedTvShows();

    List<TvResponseDTO> getOnAirTvShows();

    List<TvResponseDTO> getAiringTodayTvShows();
    
    List<TvResponseDTO> searchTvShows(String query);

    List<GenreResponseDTO> getTvGenres();
    
    TvDetailsResponseDTO getTvDetails(Long tvId);
    
    TvCreditsResponseDTO getTvCredits(Long tvId);
    
    List<VideoResponseDTO> getTvVideos(Long tvId);

    List<TvResponseDTO> getTvRecommendations(Long tvId);
}