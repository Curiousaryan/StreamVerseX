package com.streamversex.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.streamversex.backend.dto.response.GenreResponseDTO;
import com.streamversex.backend.dto.response.TvCreditsResponseDTO;
import com.streamversex.backend.dto.response.TvDetailsResponseDTO;
import com.streamversex.backend.dto.response.TvResponseDTO;
import com.streamversex.backend.dto.response.VideoResponseDTO;
import com.streamversex.backend.service.TvService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/tv")
@RequiredArgsConstructor
@Tag(
        name = "TV Shows",
        description = "Browse, search and retrieve TV show information from TMDB."
)
public class TvController {

    private final TvService tvService;

    // ==================== TRENDING ====================

    @Operation(
            summary = "Get Trending TV Shows",
            description = "Returns the current trending TV shows."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Trending TV shows retrieved successfully")
    })
    @GetMapping("/trending")
    public ResponseEntity<List<TvResponseDTO>> getTrendingTvShows() {

        return ResponseEntity.ok(
                tvService.getTrendingTvShows()
        );
    }

    // ==================== POPULAR ====================

    @Operation(
            summary = "Get Popular TV Shows",
            description = "Returns the most popular TV shows."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Popular TV shows retrieved successfully")
    })
    @GetMapping("/popular")
    public ResponseEntity<List<TvResponseDTO>> getPopularTvShows() {

        return ResponseEntity.ok(
                tvService.getPopularTvShows()
        );
    }

    // ==================== TOP RATED ====================

    @Operation(
            summary = "Get Top Rated TV Shows",
            description = "Returns the highest-rated TV shows."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Top-rated TV shows retrieved successfully")
    })
    @GetMapping("/top-rated")
    public ResponseEntity<List<TvResponseDTO>> getTopRatedTvShows() {

        return ResponseEntity.ok(
                tvService.getTopRatedTvShows()
        );
    }

    // ==================== ON AIR ====================

    @Operation(
            summary = "Get On Air TV Shows",
            description = "Returns TV shows that are currently on air."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "On-air TV shows retrieved successfully")
    })
    @GetMapping("/on-air")
    public ResponseEntity<List<TvResponseDTO>> getOnAirTvShows() {

        return ResponseEntity.ok(
                tvService.getOnAirTvShows()
        );
    }

    // ==================== AIRING TODAY ====================

    @Operation(
            summary = "Get Airing Today TV Shows",
            description = "Returns TV shows airing today."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "TV shows airing today retrieved successfully")
    })
    @GetMapping("/airing-today")
    public ResponseEntity<List<TvResponseDTO>> getAiringTodayTvShows() {

        return ResponseEntity.ok(
                tvService.getAiringTodayTvShows()
        );
    }

    // ==================== SEARCH ====================

    @Operation(
            summary = "Search TV Shows",
            description = "Searches TV shows by title."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Search completed successfully")
    })
    @GetMapping("/search")
    public ResponseEntity<List<TvResponseDTO>> searchTvShows(
            @RequestParam String query) {

        return ResponseEntity.ok(
                tvService.searchTvShows(query)
        );
    }

    // ==================== GENRES ====================

    @Operation(
            summary = "Get TV Genres",
            description = "Returns all available TV genres."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Genres retrieved successfully")
    })
    @GetMapping("/genres")
    public ResponseEntity<List<GenreResponseDTO>> getTvGenres() {

        return ResponseEntity.ok(
                tvService.getTvGenres()
        );
    }

    // ==================== DETAILS ====================

    @Operation(
            summary = "Get TV Show Details",
            description = "Returns detailed information for a specific TV show."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "TV show details retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "TV show not found")
    })
    @GetMapping("/{tvId}")
    public ResponseEntity<TvDetailsResponseDTO> getTvDetails(
            @PathVariable Long tvId) {

        return ResponseEntity.ok(
                tvService.getTvDetails(tvId)
        );
    }

    // ==================== CREDITS ====================

    @Operation(
            summary = "Get TV Show Credits",
            description = "Returns cast and crew information for a TV show."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Credits retrieved successfully")
    })
    @GetMapping("/{tvId}/credits")
    public ResponseEntity<TvCreditsResponseDTO> getTvCredits(
            @PathVariable Long tvId) {

        return ResponseEntity.ok(
                tvService.getTvCredits(tvId)
        );
    }

    // ==================== VIDEOS ====================

    @Operation(
            summary = "Get TV Show Videos",
            description = "Returns trailers and videos related to a TV show."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Videos retrieved successfully")
    })
    @GetMapping("/{tvId}/videos")
    public ResponseEntity<List<VideoResponseDTO>> getTvVideos(
            @PathVariable Long tvId) {

        return ResponseEntity.ok(
                tvService.getTvVideos(tvId)
        );
    }

    // ==================== RECOMMENDATIONS ====================

    @Operation(
            summary = "Get TV Show Recommendations",
            description = "Returns recommended TV shows similar to the selected TV show."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Recommendations retrieved successfully")
    })
    @GetMapping("/{tvId}/recommendations")
    public ResponseEntity<List<TvResponseDTO>> getTvRecommendations(
            @PathVariable Long tvId) {

        return ResponseEntity.ok(
                tvService.getTvRecommendations(tvId)
        );
    }
}