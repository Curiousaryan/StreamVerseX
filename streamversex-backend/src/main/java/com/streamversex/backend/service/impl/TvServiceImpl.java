package com.streamversex.backend.service.impl;

import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;

import com.streamversex.backend.dto.response.GenreResponseDTO;
import com.streamversex.backend.dto.response.TvCreditsResponseDTO;
import com.streamversex.backend.dto.response.TvDetailsResponseDTO;
import com.streamversex.backend.dto.response.TvResponseDTO;
import com.streamversex.backend.dto.response.VideoResponseDTO;
import com.streamversex.backend.externalapi.tmdb.client.TmdbClient;
import com.streamversex.backend.externalapi.tmdb.dto.TmdbCreditsResponse;
import com.streamversex.backend.externalapi.tmdb.dto.TmdbGenreListResponse;
import com.streamversex.backend.externalapi.tmdb.dto.TmdbTvDetailsDTO;
import com.streamversex.backend.externalapi.tmdb.dto.TmdbTvPageResponse;
import com.streamversex.backend.externalapi.tmdb.dto.TmdbVideoResponse;
import com.streamversex.backend.mapper.TvMapper;
import com.streamversex.backend.service.TvService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TvServiceImpl implements TvService {

    private final TmdbClient tmdbClient;
    private final TvMapper tvMapper;


    // ==================== TRENDING ====================

    @Override
    public List<TvResponseDTO> getTrendingTvShows() {

        return mapTvShows(
                tmdbClient.getTrendingTvShows()
        );
    }


    // ==================== POPULAR ====================

    @Override
    public List<TvResponseDTO> getPopularTvShows() {

        return mapTvShows(
                tmdbClient.getPopularTvShows()
        );
    }


    // ==================== TOP RATED ====================

    @Override
    public List<TvResponseDTO> getTopRatedTvShows() {

        return mapTvShows(
                tmdbClient.getTopRatedTvShows()
        );
    }


    // ==================== ON AIR ====================

    @Override
    public List<TvResponseDTO> getOnAirTvShows() {

        return mapTvShows(
                tmdbClient.getOnAirTvShows()
        );
    }


    // ==================== AIRING TODAY ====================

    @Override
    public List<TvResponseDTO> getAiringTodayTvShows() {

        return mapTvShows(
                tmdbClient.getAiringTodayTvShows()
        );
    }


    // ==================== COMMON MAPPER ====================

    private List<TvResponseDTO> mapTvShows(
            TmdbTvPageResponse response) {

        if (response == null || response.getResults() == null) {
            return Collections.emptyList();
        }

        return response.getResults()
                .stream()
                .map(tvMapper::toResponseDTO)
                .toList();
    }
    
 // ==================== SEARCH ====================

    @Override
    public List<TvResponseDTO> searchTvShows(String query) {

        if (query == null || query.isBlank()) {
            return Collections.emptyList();
        }

        return mapTvShows(
                tmdbClient.searchTvShows(query.trim())
        );
    }


    // ==================== GENRES ====================

    @Override
    public List<GenreResponseDTO> getTvGenres() {

        TmdbGenreListResponse response =
                tmdbClient.getTvGenres();

        if (response == null || response.getGenres() == null) {
            return Collections.emptyList();
        }

        return response.getGenres()
                .stream()
                .map(genre -> GenreResponseDTO.builder()
                        .id(genre.getId())
                        .name(genre.getName())
                        .build())
                .toList();
    }
    
 // ==================== TV DETAILS ====================

    @Override
    public TvDetailsResponseDTO getTvDetails(Long tvId) {

        TmdbTvDetailsDTO tv =
                tmdbClient.getTvDetails(tvId);

        return tvMapper.toDetailsResponseDTO(tv);
    }
    
 // ==================== TV CREDITS ====================

    @Override
    public TvCreditsResponseDTO getTvCredits(Long tvId) {

        TmdbCreditsResponse credits =
                tmdbClient.getTvCredits(tvId);

        return tvMapper.toCreditsResponseDTO(credits);
    }
    
 // ==================== TV VIDEOS ====================

    @Override
    public List<VideoResponseDTO> getTvVideos(Long tvId) {

        TmdbVideoResponse response =
                tmdbClient.getTvVideos(tvId);

        return tvMapper.toVideoResponseDTOs(response);
    }


    // ==================== TV RECOMMENDATIONS ====================

    @Override
    public List<TvResponseDTO> getTvRecommendations(Long tvId) {

        return mapTvShows(
                tmdbClient.getTvRecommendations(tvId)
        );
    }
}