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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.streamversex.backend.dto.request.WatchStatusUpdateRequestDTO;
import com.streamversex.backend.dto.request.WatchlistRequestDTO;
import com.streamversex.backend.dto.response.WatchlistResponseDTO;
import com.streamversex.backend.model.ContentType;
import com.streamversex.backend.model.WatchStatus;
import com.streamversex.backend.security.CustomUserDetails;
import com.streamversex.backend.service.WatchlistService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/watchlist")
@RequiredArgsConstructor
public class WatchlistController {

    private final WatchlistService watchlistService;


    // ==================== ADD ====================

    @PostMapping
    public ResponseEntity<WatchlistResponseDTO> addToWatchlist(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody WatchlistRequestDTO request) {

        WatchlistResponseDTO response =
                watchlistService.addToWatchlist(
                        userDetails.getId(),
                        request
                );

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(response);
    }


    // ==================== GET ALL / FILTER ====================

    @GetMapping
    public ResponseEntity<List<WatchlistResponseDTO>> getWatchlist(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestParam(required = false) WatchStatus status) {

        if (status != null) {

            return ResponseEntity.ok(
                    watchlistService.getWatchlistByStatus(
                            userDetails.getId(),
                            status
                    )
            );
        }

        return ResponseEntity.ok(
                watchlistService.getWatchlist(
                        userDetails.getId()
                )
        );
    }


    // ==================== UPDATE STATUS ====================

    @PutMapping("/{contentType}/{contentId}/status")
    public ResponseEntity<WatchlistResponseDTO> updateStatus(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable ContentType contentType,
            @PathVariable Long contentId,
            @Valid @RequestBody WatchStatusUpdateRequestDTO request) {

        return ResponseEntity.ok(
                watchlistService.updateStatus(
                        userDetails.getId(),
                        contentType,
                        contentId,
                        request.getStatus()
                )
        );
    }


    // ==================== DELETE ====================

    @DeleteMapping("/{contentType}/{contentId}")
    public ResponseEntity<Void> removeFromWatchlist(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable ContentType contentType,
            @PathVariable Long contentId) {

        watchlistService.removeFromWatchlist(
                userDetails.getId(),
                contentType,
                contentId
        );

        return ResponseEntity.noContent().build();
    }


    // ==================== CHECK ====================

    @GetMapping("/check/{contentType}/{contentId}")
    public ResponseEntity<Map<String, Boolean>> isInWatchlist(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @PathVariable ContentType contentType,
            @PathVariable Long contentId) {

        boolean inWatchlist =
                watchlistService.isInWatchlist(
                        userDetails.getId(),
                        contentType,
                        contentId
                );

        return ResponseEntity.ok(
                Map.of("inWatchlist", inWatchlist)
        );
    }
}