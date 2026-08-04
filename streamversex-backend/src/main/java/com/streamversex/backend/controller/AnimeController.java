package com.streamversex.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.streamversex.backend.dto.response.AnimeCharacterResponseDTO;
import com.streamversex.backend.dto.response.AnimeDetailsResponseDTO;
import com.streamversex.backend.dto.response.AnimeResponseDTO;
import com.streamversex.backend.service.AnimeService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/anime")
@RequiredArgsConstructor
@Tag(
        name = "Anime",
        description = "Browse trending, popular, seasonal and recommended anime."
)
public class AnimeController {

    private final AnimeService animeService;

    // ==================== TRENDING ====================

    @Operation(
            summary = "Get Trending Anime",
            description = "Returns the current trending anime."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Trending anime retrieved successfully")
    })
    @GetMapping("/trending")
    public ResponseEntity<List<AnimeResponseDTO>> getTrendingAnime() {

        return ResponseEntity.ok(
                animeService.getTrendingAnime()
        );
    }

    // ==================== POPULAR ====================

    @Operation(
            summary = "Get Popular Anime",
            description = "Returns the most popular anime."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Popular anime retrieved successfully")
    })
    @GetMapping("/popular")
    public ResponseEntity<List<AnimeResponseDTO>> getPopularAnime() {

        return ResponseEntity.ok(
                animeService.getPopularAnime()
        );
    }

    // ==================== TOP RATED ====================

    @Operation(
            summary = "Get Top Rated Anime",
            description = "Returns the highest-rated anime."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Top rated anime retrieved successfully")
    })
    @GetMapping("/top-rated")
    public ResponseEntity<List<AnimeResponseDTO>> getTopRatedAnime() {

        return ResponseEntity.ok(
                animeService.getTopRatedAnime()
        );
    }

    // ==================== SEASONAL ====================

    @Operation(
            summary = "Get Seasonal Anime",
            description = "Returns anime for a given season and year."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Seasonal anime retrieved successfully")
    })
    @GetMapping("/seasonal")
    public ResponseEntity<List<AnimeResponseDTO>> getSeasonalAnime(
            @RequestParam String season,
            @RequestParam Integer year) {

        return ResponseEntity.ok(
                animeService.getSeasonalAnime(
                        season,
                        year
                )
        );
    }

    // ==================== UPCOMING ====================

    @Operation(
            summary = "Get Upcoming Anime",
            description = "Returns upcoming anime releases."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Upcoming anime retrieved successfully")
    })
    @GetMapping("/upcoming")
    public ResponseEntity<List<AnimeResponseDTO>> getUpcomingAnime() {

        return ResponseEntity.ok(
                animeService.getUpcomingAnime()
        );
    }

    // ==================== SEARCH ====================

    @Operation(
            summary = "Search Anime",
            description = "Search anime by title."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Search completed successfully")
    })
    @GetMapping("/search")
    public ResponseEntity<List<AnimeResponseDTO>> searchAnime(
            @RequestParam String query) {

        return ResponseEntity.ok(
                animeService.searchAnime(query)
        );
    }

    // ==================== DETAILS ====================

    @Operation(
            summary = "Get Anime Details",
            description = "Returns detailed information about a specific anime."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Anime details retrieved successfully"),
            @ApiResponse(responseCode = "404", description = "Anime not found")
    })
    @GetMapping("/{animeId}")
    public ResponseEntity<AnimeDetailsResponseDTO> getAnimeDetails(
            @PathVariable Long animeId) {

        return ResponseEntity.ok(
                animeService.getAnimeDetails(animeId)
        );
    }

    // ==================== CHARACTERS ====================

    @Operation(
            summary = "Get Anime Characters",
            description = "Returns the main characters of the selected anime."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Characters retrieved successfully")
    })
    @GetMapping("/{animeId}/characters")
    public ResponseEntity<List<AnimeCharacterResponseDTO>>
            getAnimeCharacters(
                    @PathVariable Long animeId) {

        return ResponseEntity.ok(
                animeService.getAnimeCharacters(animeId)
        );
    }

    // ==================== RECOMMENDATIONS ====================

    @Operation(
            summary = "Get Anime Recommendations",
            description = "Returns anime recommendations similar to the selected anime."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Recommendations retrieved successfully")
    })
    @GetMapping("/{animeId}/recommendations")
    public ResponseEntity<List<AnimeResponseDTO>>
            getAnimeRecommendations(
                    @PathVariable Long animeId) {

        return ResponseEntity.ok(
                animeService.getAnimeRecommendations(animeId)
        );
    }
}