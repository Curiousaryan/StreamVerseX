package com.streamversex.backend.service;

import java.util.List;

import com.streamversex.backend.dto.response.GenreResponseDTO;
import com.streamversex.backend.dto.response.MovieCreditsResponseDTO;
import com.streamversex.backend.dto.response.MovieDetailsResponseDTO;
import com.streamversex.backend.dto.response.MovieResponseDTO;
import com.streamversex.backend.dto.response.VideoResponseDTO;

public interface MovieService {

    List<MovieResponseDTO> getTrendingMovies();

    List<MovieResponseDTO> getPopularMovies();

    List<MovieResponseDTO> getTopRatedMovies();

    List<MovieResponseDTO> getUpcomingMovies();

    List<MovieResponseDTO> getNowPlayingMovies();
    
    MovieDetailsResponseDTO getMovieDetails(Long movieId);
    
    List<MovieResponseDTO> searchMovies(String query);
    
    List<GenreResponseDTO> getMovieGenres();
    
    MovieCreditsResponseDTO getMovieCredits(Long movieId);
    
    List<VideoResponseDTO> getMovieVideos(Long movieId);
    
    List<MovieResponseDTO> getMovieRecommendations(Long movieId);
}