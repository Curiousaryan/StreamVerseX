package com.streamversex.backend.service;

import java.util.List;

import com.streamversex.backend.dto.request.WatchlistRequestDTO;
import com.streamversex.backend.dto.response.WatchlistResponseDTO;
import com.streamversex.backend.model.ContentType;
import com.streamversex.backend.model.WatchStatus;

public interface WatchlistService {

    WatchlistResponseDTO addToWatchlist(
            String userId,
            WatchlistRequestDTO request);

    List<WatchlistResponseDTO> getWatchlist(
            String userId);

    List<WatchlistResponseDTO> getWatchlistByStatus(
            String userId,
            WatchStatus status);

    WatchlistResponseDTO updateStatus(
            String userId,
            ContentType contentType,
            Long contentId,
            WatchStatus status);

    void removeFromWatchlist(
            String userId,
            ContentType contentType,
            Long contentId);

    boolean isInWatchlist(
            String userId,
            ContentType contentType,
            Long contentId);
}