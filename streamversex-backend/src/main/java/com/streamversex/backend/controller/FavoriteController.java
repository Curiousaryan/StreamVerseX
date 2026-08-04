package com.streamversex.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.streamversex.backend.dto.request.FavoriteRequestDTO;
import com.streamversex.backend.dto.response.FavoriteResponseDTO;
import com.streamversex.backend.model.ContentType;
import com.streamversex.backend.security.CustomUserDetails;
import com.streamversex.backend.service.FavoriteService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
@Tag(
        name = "Favorites",
        description = "Manage user's favorite movies, TV shows and anime."
)
public class FavoriteController {

    private final FavoriteService favoriteService;

    // ==================== ADD ====================

    @Operation(
            summary = "Add to Favorites",
            description = "Adds a movie, TV show or anime to the authenticated user's favorites."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Added successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @PostMapping
    public ResponseEntity<FavoriteResponseDTO> addFavorite(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody FavoriteRequestDTO request) {

        FavoriteResponseDTO response =
                favoriteService.addFavorite(
                        userDetails.getId(),
                        request
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }

    // ==================== GET ALL ====================

    @Operation(
            summary = "Get Favorites",
            description = "Returns all favorite content for the authenticated user."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Favorites retrieved successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @GetMapping
    public ResponseEntity<List<FavoriteResponseDTO>> getFavorites(
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        return ResponseEntity.ok(
                favoriteService.getFavorites(
                        userDetails.getId()
                )
        );
    }

    // ==================== DELETE ====================

    @Operation(
            summary = "Remove Favorite",
            description = "Removes a content item from the authenticated user's favorites."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Removed successfully"),
            @ApiResponse(responseCode = "404", description = "Favorite not found")
    })
    @DeleteMapping("/{contentType}/{contentId}")
    public ResponseEntity<Void> removeFavorite(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable ContentType contentType,
            @PathVariable Long contentId) {

        favoriteService.removeFavorite(
                userDetails.getId(),
                contentType,
                contentId
        );

        return ResponseEntity.noContent().build();
    }

    // ==================== CHECK ====================

    @Operation(
            summary = "Check Favorite",
            description = "Checks whether a specific content item exists in the authenticated user's favorites."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Status returned successfully")
    })
    @GetMapping("/check/{contentType}/{contentId}")
    public ResponseEntity<Map<String, Boolean>> isFavorite(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable ContentType contentType,
            @PathVariable Long contentId) {

        boolean favorite =
                favoriteService.isFavorite(
                        userDetails.getId(),
                        contentType,
                        contentId
                );

        return ResponseEntity.ok(
                Map.of("favorite", favorite)
        );
    }
}