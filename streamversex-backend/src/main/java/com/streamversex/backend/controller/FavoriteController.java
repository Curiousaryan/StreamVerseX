package com.streamversex.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.streamversex.backend.dto.request.FavoriteRequestDTO;
import com.streamversex.backend.dto.response.FavoriteResponseDTO;
import com.streamversex.backend.model.ContentType;
import com.streamversex.backend.security.CustomUserDetails;
import com.streamversex.backend.service.FavoriteService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
public class FavoriteController {

    private final FavoriteService favoriteService;


    // ==================== ADD ====================

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