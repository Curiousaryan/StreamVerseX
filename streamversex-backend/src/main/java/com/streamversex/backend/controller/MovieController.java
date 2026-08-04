package com.streamversex.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.streamversex.backend.dto.response.GenreResponseDTO;
import com.streamversex.backend.dto.response.MovieCreditsResponseDTO;
import com.streamversex.backend.dto.response.MovieDetailsResponseDTO;
import com.streamversex.backend.dto.response.MovieResponseDTO;
import com.streamversex.backend.dto.response.VideoResponseDTO;
import com.streamversex.backend.service.MovieService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/movies")
@RequiredArgsConstructor
@Tag(
        name = "Movies",
        description = "Browse, search and retrieve movie information from TMDB."
)
public class MovieController {

    private final MovieService movieService;

    // ==================== TRENDING ====================

    @Operation(
            summary = "Get Trending Movies",
            description = "Returns the current trending movies."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Trending movies retrieved successfully")
    })
    @GetMapping("/trending")
    public ResponseEntity<List<MovieResponseDTO>> getTrendingMovies() {

        return ResponseEntity.ok(
                movieService.getTrendingMovies()
        );
    }

    // ==================== POPULAR ====================

    @Operation(
            summary = "Get Popular Movies",
            description = "Returns the most popular movies."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Popular movies retrieved successfully")
    })
    @GetMapping("/popular")
    public ResponseEntity<List<MovieResponseDTO>> getPopularMovies() {

        return ResponseEntity.ok(
                movieService.getPopularMovies()
        );
    }

    // ==================== TOP RATED ====================

    @Operation(
            summary = "Get Top Rated Movies",
            description = "Returns the highest-rated movies."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Top-rated movies retrieved successfully")
    })
    @GetMapping("/top-rated")
    public ResponseEntity<List<MovieResponseDTO>> getTopRatedMovies() {

        return ResponseEntity.ok(
                movieService.getTopRatedMovies()
        );
    }

    // ==================== UPCOMING ====================

    @Operation(
            summary = "Get Upcoming Movies",
            description = "Returns upcoming movie releases."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Upcoming movies retrieved successfully")
    })
    @GetMapping("/upcoming")
    public ResponseEntity<List<MovieResponseDTO>> getUpcomingMovies() {

        return ResponseEntity.ok(
                movieService.getUpcomingMovies()
        );
    }

    // ==================== NOW PLAYING ====================

    @Operation(
            summary = "Get Now Playing Movies",
            description = "Returns movies that are currently playing in theaters."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Now playing movies retrieved successfully")
    })
    @GetMapping("/now-playing")
    public ResponseEntity<List<MovieResponseDTO>> getNowPlayingMovies() {

        return ResponseEntity.ok(
                movieService.getNowPlayingMovies()
        );
    }

    // ==================== MOVIE DETAILS ====================

    @Operation(
            summary = "Get Movie Details",
            description = "Returns detailed information for a specific movie."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Movie details retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "Movie not found")
    })
    @GetMapping("/{movieId}")
    public ResponseEntity<MovieDetailsResponseDTO> getMovieDetails(
            @PathVariable Long movieId) {

        return ResponseEntity.ok(
                movieService.getMovieDetails(movieId)
        );
    }

    // ==================== SEARCH ====================

    @Operation(
            summary = "Search Movies",
            description = "Searches movies by title."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Search completed successfully")
    })
    @GetMapping("/search")
    public ResponseEntity<List<MovieResponseDTO>> searchMovies(
            @RequestParam String query) {

        return ResponseEntity.ok(
                movieService.searchMovies(query)
        );
    }

    // ==================== GENRES ====================

    @Operation(
            summary = "Get Movie Genres",
            description = "Returns all available movie genres."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Genres retrieved successfully")
    })
    @GetMapping("/genres")
    public ResponseEntity<List<GenreResponseDTO>> getMovieGenres() {

        return ResponseEntity.ok(
                movieService.getMovieGenres()
        );
    }

    // ==================== CREDITS ====================

    @Operation(
            summary = "Get Movie Credits",
            description = "Returns cast and crew information for a movie."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Credits retrieved successfully")
    })
    @GetMapping("/{movieId}/credits")
    public ResponseEntity<MovieCreditsResponseDTO> getMovieCredits(
            @PathVariable Long movieId) {

        return ResponseEntity.ok(
                movieService.getMovieCredits(movieId)
        );
    }

    // ==================== VIDEOS ====================

    @Operation(
            summary = "Get Movie Videos",
            description = "Returns trailers and other videos related to a movie."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Videos retrieved successfully")
    })
    @GetMapping("/{movieId}/videos")
    public ResponseEntity<List<VideoResponseDTO>> getMovieVideos(
            @PathVariable Long movieId) {

        return ResponseEntity.ok(
                movieService.getMovieVideos(movieId)
        );
    }

    // ==================== RECOMMENDATIONS ====================

    @Operation(
            summary = "Get Movie Recommendations",
            description = "Returns recommended movies similar to the selected movie."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Recommendations retrieved successfully")
    })
    @GetMapping("/{movieId}/recommendations")
    public ResponseEntity<List<MovieResponseDTO>> getMovieRecommendations(
            @PathVariable Long movieId) {

        return ResponseEntity.ok(
                movieService.getMovieRecommendations(movieId)
        );
    }
}