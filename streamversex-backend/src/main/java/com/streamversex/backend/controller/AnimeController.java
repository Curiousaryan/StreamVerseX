package com.streamversex.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.streamversex.backend.dto.response.AnimeCharacterResponseDTO;
import com.streamversex.backend.dto.response.AnimeDetailsResponseDTO;
import com.streamversex.backend.dto.response.AnimeResponseDTO;
import com.streamversex.backend.service.AnimeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/anime")
@RequiredArgsConstructor
public class AnimeController {

    private final AnimeService animeService;

    @GetMapping("/trending")
    public ResponseEntity<List<AnimeResponseDTO>> getTrendingAnime() {

        return ResponseEntity.ok(
                animeService.getTrendingAnime()
        );
    }
    
    @GetMapping("/popular")
    public ResponseEntity<List<AnimeResponseDTO>> getPopularAnime() {

        return ResponseEntity.ok(
                animeService.getPopularAnime()
        );
    }


    @GetMapping("/top-rated")
    public ResponseEntity<List<AnimeResponseDTO>> getTopRatedAnime() {

        return ResponseEntity.ok(
                animeService.getTopRatedAnime()
        );
    }
    
    @GetMapping("/seasonal")
    public ResponseEntity<List<AnimeResponseDTO>> getSeasonalAnime(

            @RequestParam String season,

            @RequestParam Integer year) {

        return ResponseEntity.ok(
                animeService.getSeasonalAnime(
                        season,
                        year)
        );
    }
    
    @GetMapping("/upcoming")
    public ResponseEntity<List<AnimeResponseDTO>> getUpcomingAnime() {

        return ResponseEntity.ok(
                animeService.getUpcomingAnime()
        );
    }
    
 // ==================== SEARCH ====================

    @GetMapping("/search")
    public ResponseEntity<List<AnimeResponseDTO>> searchAnime(
            @RequestParam String query) {

        return ResponseEntity.ok(
                animeService.searchAnime(query)
        );
    }
    
    @GetMapping("/{animeId}")
    public ResponseEntity<AnimeDetailsResponseDTO> getAnimeDetails(
            @PathVariable Long animeId) {

        return ResponseEntity.ok(
                animeService.getAnimeDetails(animeId)
        );
    }
    
    @GetMapping("/{animeId}/characters")
    public ResponseEntity<List<AnimeCharacterResponseDTO>>
            getAnimeCharacters(
                    @PathVariable Long animeId) {

        return ResponseEntity.ok(
                animeService.getAnimeCharacters(animeId)
        );
    }
    
    @GetMapping("/{animeId}/recommendations")
    public ResponseEntity<List<AnimeResponseDTO>>
            getAnimeRecommendations(
                    @PathVariable Long animeId) {

        return ResponseEntity.ok(
                animeService.getAnimeRecommendations(animeId)
        );
    }
}