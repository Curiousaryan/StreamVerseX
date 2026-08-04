package com.streamversex.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.streamversex.backend.dto.request.AnimeRecommendationRequestDTO;
import com.streamversex.backend.dto.request.CompareMoviesRequestDTO;
import com.streamversex.backend.dto.request.ExplainEndingRequestDTO;
import com.streamversex.backend.dto.request.MovieSummaryRequestDTO;
import com.streamversex.backend.dto.request.RecommendationRequestDTO;
import com.streamversex.backend.dto.response.AIResponseDTO;
import com.streamversex.backend.security.CustomUserDetails;
import com.streamversex.backend.service.AIService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
@Tag(
        name = "AI Assistant",
        description = "Premium AI-powered features including movie summaries, recommendations, ending explanations and comparisons."
)
public class AIController {

    private final AIService aiService;

    // ==================== MOVIE SUMMARY ====================

    @Operation(
            summary = "Generate Movie Summary",
            description = "Generates a spoiler-free AI summary for the requested movie."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Summary generated successfully"),
            @ApiResponse(responseCode = "403", description = "Premium subscription required"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @PostMapping("/movie-summary")
    public ResponseEntity<AIResponseDTO> summarizeMovie(
            @AuthenticationPrincipal CustomUserDetails user,
            @Valid @RequestBody MovieSummaryRequestDTO request) {

        return ResponseEntity.ok(
                aiService.summarizeMovie(
                        user.getId(),
                        request
                )
        );
    }

    // ==================== EXPLAIN ENDING ====================

    @Operation(
            summary = "Explain Movie Ending",
            description = "Uses AI to explain the ending of a movie in simple language."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Ending explained successfully"),
            @ApiResponse(responseCode = "403", description = "Premium subscription required")
    })
    @PostMapping("/explain-ending")
    public ResponseEntity<AIResponseDTO> explainEnding(
            @AuthenticationPrincipal CustomUserDetails user,
            @Valid @RequestBody ExplainEndingRequestDTO request) {

        return ResponseEntity.ok(
                aiService.explainEnding(
                        user.getId(),
                        request
                )
        );
    }

    // ==================== MOVIE RECOMMENDATION ====================

    @Operation(
            summary = "Recommend Movies",
            description = "Returns AI-generated movie recommendations similar to the provided movie."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Recommendations generated successfully"),
            @ApiResponse(responseCode = "403", description = "Premium subscription required")
    })
    @PostMapping("/recommend-movies")
    public ResponseEntity<AIResponseDTO> recommendMovies(
            @AuthenticationPrincipal CustomUserDetails user,
            @Valid @RequestBody RecommendationRequestDTO request) {

        return ResponseEntity.ok(
                aiService.recommendMovies(
                        user.getId(),
                        request
                )
        );
    }

    // ==================== ANIME RECOMMENDATION ====================

    @Operation(
            summary = "Recommend Anime",
            description = "Returns AI-generated anime recommendations based on the provided anime."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Recommendations generated successfully"),
            @ApiResponse(responseCode = "403", description = "Premium subscription required")
    })
    @PostMapping("/recommend-anime")
    public ResponseEntity<AIResponseDTO> recommendAnime(
            @AuthenticationPrincipal CustomUserDetails user,
            @Valid @RequestBody AnimeRecommendationRequestDTO request) {

        return ResponseEntity.ok(
                aiService.recommendAnime(
                        user.getId(),
                        request
                )
        );
    }

    // ==================== COMPARE MOVIES ====================

    @Operation(
            summary = "Compare Movies",
            description = "Uses AI to compare two movies based on story, acting, visuals, music and overall recommendation."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Comparison generated successfully"),
            @ApiResponse(responseCode = "403", description = "Premium subscription required")
    })
    @PostMapping("/compare-movies")
    public ResponseEntity<AIResponseDTO> compareMovies(
            @AuthenticationPrincipal CustomUserDetails user,
            @Valid @RequestBody CompareMoviesRequestDTO request) {

        return ResponseEntity.ok(
                aiService.compareMovies(
                        user.getId(),
                        request
                )
        );
    }
}