package com.streamversex.backend.service.impl;

import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;

import com.streamversex.backend.dto.response.GenreResponseDTO;
import com.streamversex.backend.dto.response.MovieCreditsResponseDTO;
import com.streamversex.backend.dto.response.MovieDetailsResponseDTO;
import com.streamversex.backend.dto.response.MovieResponseDTO;
import com.streamversex.backend.dto.response.VideoResponseDTO;
import com.streamversex.backend.externalapi.tmdb.client.TmdbClient;
import com.streamversex.backend.externalapi.tmdb.dto.TmdbCreditsResponse;
import com.streamversex.backend.externalapi.tmdb.dto.TmdbGenreListResponse;
import com.streamversex.backend.externalapi.tmdb.dto.TmdbMovieDetailsDTO;
import com.streamversex.backend.externalapi.tmdb.dto.TmdbMoviePageResponse;
import com.streamversex.backend.externalapi.tmdb.dto.TmdbVideoResponse;
import com.streamversex.backend.mapper.MovieMapper;
import com.streamversex.backend.service.MovieService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class MovieServiceImpl implements MovieService {

    private final TmdbClient tmdbClient;
    private final MovieMapper movieMapper;


    // ==================== TRENDING ====================

    @Override
    public List<MovieResponseDTO> getTrendingMovies() {

        return mapMovies(
                tmdbClient.getTrendingMovies()
        );
    }


    // ==================== POPULAR ====================

    @Override
    public List<MovieResponseDTO> getPopularMovies() {

        return mapMovies(
                tmdbClient.getPopularMovies()
        );
    }


    // ==================== TOP RATED ====================

    @Override
    public List<MovieResponseDTO> getTopRatedMovies() {

        return mapMovies(
                tmdbClient.getTopRatedMovies()
        );
    }


    // ==================== UPCOMING ====================

    @Override
    public List<MovieResponseDTO> getUpcomingMovies() {

        return mapMovies(
                tmdbClient.getUpcomingMovies()
        );
    }


    // ==================== NOW PLAYING ====================

    @Override
    public List<MovieResponseDTO> getNowPlayingMovies() {

        return mapMovies(
                tmdbClient.getNowPlayingMovies()
        );
    }


    // ==================== COMMON MAPPER ====================

    private List<MovieResponseDTO> mapMovies(
            TmdbMoviePageResponse response) {

        if (response == null || response.getResults() == null) {
            return Collections.emptyList();
        }

        return response.getResults()
                .stream()
                .map(movieMapper::toResponseDTO)
                .toList();
    }
    
 // ==================== MOVIE DETAILS ====================

    @Override
    public MovieDetailsResponseDTO getMovieDetails(Long movieId) {

        TmdbMovieDetailsDTO movie =
                tmdbClient.getMovieDetails(movieId);

        return movieMapper.toDetailsResponseDTO(movie);
    }
    
 // ==================== SEARCH MOVIES ====================

    @Override
    public List<MovieResponseDTO> searchMovies(String query) {

        if (query == null || query.isBlank()) {
            return Collections.emptyList();
        }

        return mapMovies(
                tmdbClient.searchMovies(query.trim())
        );
    }
    
 // ==================== MOVIE GENRES ====================

    @Override
    public List<GenreResponseDTO> getMovieGenres() {

        TmdbGenreListResponse response =
                tmdbClient.getMovieGenres();

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
    
 // ==================== MOVIE CREDITS ====================

    @Override
    public MovieCreditsResponseDTO getMovieCredits(Long movieId) {

        TmdbCreditsResponse credits =
                tmdbClient.getMovieCredits(movieId);

        return movieMapper.toCreditsResponseDTO(credits);
    }
    
 // ==================== MOVIE VIDEOS ====================

    @Override
    public List<VideoResponseDTO> getMovieVideos(Long movieId) {

        TmdbVideoResponse response =
                tmdbClient.getMovieVideos(movieId);

        return movieMapper.toVideoResponseDTOs(response);
    }
    
 // ==================== MOVIE RECOMMENDATIONS ====================

    @Override
    public List<MovieResponseDTO> getMovieRecommendations(Long movieId) {

        return mapMovies(
                tmdbClient.getMovieRecommendations(movieId)
        );
    }
}