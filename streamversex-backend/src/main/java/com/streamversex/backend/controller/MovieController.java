package com.streamversex.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.streamversex.backend.dto.response.GenreResponseDTO;
import com.streamversex.backend.dto.response.MovieCreditsResponseDTO;
import com.streamversex.backend.dto.response.MovieDetailsResponseDTO;
import com.streamversex.backend.dto.response.MovieResponseDTO;
import com.streamversex.backend.dto.response.VideoResponseDTO;
import com.streamversex.backend.service.MovieService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/movies")
@RequiredArgsConstructor
public class MovieController {

    private final MovieService movieService;


    // ==================== TRENDING ====================

    @GetMapping("/trending")
    public ResponseEntity<List<MovieResponseDTO>> getTrendingMovies() {

        return ResponseEntity.ok(
                movieService.getTrendingMovies()
        );
    }


    // ==================== POPULAR ====================

    @GetMapping("/popular")
    public ResponseEntity<List<MovieResponseDTO>> getPopularMovies() {

        return ResponseEntity.ok(
                movieService.getPopularMovies()
        );
    }


    // ==================== TOP RATED ====================

    @GetMapping("/top-rated")
    public ResponseEntity<List<MovieResponseDTO>> getTopRatedMovies() {

        return ResponseEntity.ok(
                movieService.getTopRatedMovies()
        );
    }


    // ==================== UPCOMING ====================

    @GetMapping("/upcoming")
    public ResponseEntity<List<MovieResponseDTO>> getUpcomingMovies() {

        return ResponseEntity.ok(
                movieService.getUpcomingMovies()
        );
    }


    // ==================== NOW PLAYING ====================

    @GetMapping("/now-playing")
    public ResponseEntity<List<MovieResponseDTO>> getNowPlayingMovies() {

        return ResponseEntity.ok(
                movieService.getNowPlayingMovies()
        );
    }
    
 // ==================== MOVIE DETAILS ====================

    @GetMapping("/{movieId}")
    public ResponseEntity<MovieDetailsResponseDTO> getMovieDetails(
            @PathVariable Long movieId) {

        return ResponseEntity.ok(
                movieService.getMovieDetails(movieId)
        );
    }
    
 // ==================== SEARCH MOVIES ====================

    @GetMapping("/search")
    public ResponseEntity<List<MovieResponseDTO>> searchMovies(
            @RequestParam String query) {

        return ResponseEntity.ok(
                movieService.searchMovies(query)
        );
    }
    
 // ==================== MOVIE GENRES ====================

    @GetMapping("/genres")
    public ResponseEntity<List<GenreResponseDTO>> getMovieGenres() {

        return ResponseEntity.ok(
                movieService.getMovieGenres()
        );
    }
    
 // ==================== MOVIE CREDITS ====================

    @GetMapping("/{movieId}/credits")
    public ResponseEntity<MovieCreditsResponseDTO> getMovieCredits(
            @PathVariable Long movieId) {

        return ResponseEntity.ok(
                movieService.getMovieCredits(movieId)
        );
    }
    
 // ==================== MOVIE VIDEOS ====================

    @GetMapping("/{movieId}/videos")
    public ResponseEntity<List<VideoResponseDTO>> getMovieVideos(
            @PathVariable Long movieId) {

        return ResponseEntity.ok(
                movieService.getMovieVideos(movieId)
        );
    }
    
 // ==================== MOVIE RECOMMENDATIONS ====================

    @GetMapping("/{movieId}/recommendations")
    public ResponseEntity<List<MovieResponseDTO>> getMovieRecommendations(
            @PathVariable Long movieId) {

        return ResponseEntity.ok(
                movieService.getMovieRecommendations(movieId)
        );
    }
}