package com.streamversex.backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import com.streamversex.backend.dto.request.WatchStatusUpdateRequestDTO;
import com.streamversex.backend.dto.request.WatchlistRequestDTO;
import com.streamversex.backend.dto.response.WatchlistResponseDTO;
import com.streamversex.backend.model.ContentType;
import com.streamversex.backend.model.WatchStatus;
import com.streamversex.backend.security.CustomUserDetails;
import com.streamversex.backend.service.WatchlistService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/watchlist")
@RequiredArgsConstructor
@Tag(
        name = "Watchlist",
        description = "Manage the authenticated user's watchlist and watch status."
)
public class WatchlistController {

    private final WatchlistService watchlistService;

    // ==================== ADD ====================

    @Operation(
            summary = "Add to Watchlist",
            description = "Adds a movie, TV show or anime to the authenticated user's watchlist."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "Added successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
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

    @Operation(
            summary = "Get Watchlist",
            description = "Returns the authenticated user's watchlist. Optionally filter by watch status."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Watchlist retrieved successfully")
    })
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

    @Operation(
            summary = "Update Watch Status",
            description = "Updates the watch status of a specific content item."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Status updated successfully"),
            @ApiResponse(responseCode = "404", description = "Watchlist item not found")
    })
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

    @Operation(
            summary = "Remove from Watchlist",
            description = "Removes a movie, TV show or anime from the authenticated user's watchlist."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "204", description = "Removed successfully"),
            @ApiResponse(responseCode = "404", description = "Watchlist item not found")
    })
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

    @Operation(
            summary = "Check Watchlist",
            description = "Checks whether a specific content item exists in the authenticated user's watchlist."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Status returned successfully")
    })
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