package com.streamversex.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.streamversex.backend.dto.response.GenreResponseDTO;
import com.streamversex.backend.dto.response.TvCreditsResponseDTO;
import com.streamversex.backend.dto.response.TvDetailsResponseDTO;
import com.streamversex.backend.dto.response.TvResponseDTO;
import com.streamversex.backend.dto.response.VideoResponseDTO;
import com.streamversex.backend.service.TvService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/tv")
@RequiredArgsConstructor
public class TvController {

    private final TvService tvService;


    @GetMapping("/trending")
    public ResponseEntity<List<TvResponseDTO>> getTrendingTvShows() {

        return ResponseEntity.ok(
                tvService.getTrendingTvShows()
        );
    }


    @GetMapping("/popular")
    public ResponseEntity<List<TvResponseDTO>> getPopularTvShows() {

        return ResponseEntity.ok(
                tvService.getPopularTvShows()
        );
    }


    @GetMapping("/top-rated")
    public ResponseEntity<List<TvResponseDTO>> getTopRatedTvShows() {

        return ResponseEntity.ok(
                tvService.getTopRatedTvShows()
        );
    }


    @GetMapping("/on-air")
    public ResponseEntity<List<TvResponseDTO>> getOnAirTvShows() {

        return ResponseEntity.ok(
                tvService.getOnAirTvShows()
        );
    }


    @GetMapping("/airing-today")
    public ResponseEntity<List<TvResponseDTO>> getAiringTodayTvShows() {

        return ResponseEntity.ok(
                tvService.getAiringTodayTvShows()
        );
    }
    
 // ==================== SEARCH ====================

    @GetMapping("/search")
    public ResponseEntity<List<TvResponseDTO>> searchTvShows(
            @RequestParam String query) {

        return ResponseEntity.ok(
                tvService.searchTvShows(query)
        );
    }


    // ==================== GENRES ====================

    @GetMapping("/genres")
    public ResponseEntity<List<GenreResponseDTO>> getTvGenres() {

        return ResponseEntity.ok(
                tvService.getTvGenres()
        );
    }
    
 // ==================== TV DETAILS ====================

    @GetMapping("/{tvId}")
    public ResponseEntity<TvDetailsResponseDTO> getTvDetails(
            @PathVariable Long tvId) {

        return ResponseEntity.ok(
                tvService.getTvDetails(tvId)
        );
    }
    
    
 // ==================== TV CREDITS ====================

    @GetMapping("/{tvId}/credits")
    public ResponseEntity<TvCreditsResponseDTO> getTvCredits(
            @PathVariable Long tvId) {

        return ResponseEntity.ok(
                tvService.getTvCredits(tvId)
        );
    }
    
    
 // ==================== TV VIDEOS ====================

    @GetMapping("/{tvId}/videos")
    public ResponseEntity<List<VideoResponseDTO>> getTvVideos(
            @PathVariable Long tvId) {

        return ResponseEntity.ok(
                tvService.getTvVideos(tvId)
        );
    }


    // ==================== TV RECOMMENDATIONS ====================

    @GetMapping("/{tvId}/recommendations")
    public ResponseEntity<List<TvResponseDTO>> getTvRecommendations(
            @PathVariable Long tvId) {

        return ResponseEntity.ok(
                tvService.getTvRecommendations(tvId)
        );
    }
}