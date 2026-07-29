package com.streamversex.backend.service.impl;

import java.time.Instant;
import java.util.List;

import org.springframework.stereotype.Service;

import com.streamversex.backend.dto.request.WatchlistRequestDTO;
import com.streamversex.backend.dto.response.WatchlistResponseDTO;
import com.streamversex.backend.exception.WatchlistAlreadyExistsException;
import com.streamversex.backend.exception.WatchlistNotFoundException;
import com.streamversex.backend.mapper.WatchlistMapper;
import com.streamversex.backend.model.ContentType;
import com.streamversex.backend.model.WatchStatus;
import com.streamversex.backend.model.Watchlist;
import com.streamversex.backend.repository.WatchlistRepository;
import com.streamversex.backend.service.WatchlistService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class WatchlistServiceImpl implements WatchlistService {

    private final WatchlistRepository watchlistRepository;
    private final WatchlistMapper watchlistMapper;


    // ==================== ADD ====================

    @Override
    public WatchlistResponseDTO addToWatchlist(
            String userId,
            WatchlistRequestDTO request) {

        boolean alreadyExists =
                watchlistRepository
                        .existsByUserIdAndContentTypeAndContentId(
                                userId,
                                request.getContentType(),
                                request.getContentId()
                        );

        if (alreadyExists) {
        	throw new WatchlistAlreadyExistsException(
                    "Content is already in watchlist."
            );
        }

        Instant now = Instant.now();

        WatchStatus status =
                request.getStatus() != null
                        ? request.getStatus()
                        : WatchStatus.PLANNED;

        Watchlist watchlist = Watchlist.builder()
                .userId(userId)
                .contentType(request.getContentType())
                .contentId(request.getContentId())
                .title(request.getTitle())
                .posterUrl(request.getPosterUrl())
                .status(status)
                .createdAt(now)
                .updatedAt(now)
                .build();

        Watchlist saved =
                watchlistRepository.save(watchlist);

        return watchlistMapper.toResponseDTO(saved);
    }


    // ==================== GET ALL ====================

    @Override
    public List<WatchlistResponseDTO> getWatchlist(
            String userId) {

        return watchlistRepository
                .findByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(watchlistMapper::toResponseDTO)
                .toList();
    }


    // ==================== FILTER BY STATUS ====================

    @Override
    public List<WatchlistResponseDTO> getWatchlistByStatus(
            String userId,
            WatchStatus status) {

        return watchlistRepository
                .findByUserIdAndStatusOrderByUpdatedAtDesc(
                        userId,
                        status
                )
                .stream()
                .map(watchlistMapper::toResponseDTO)
                .toList();
    }


    // ==================== UPDATE STATUS ====================

    @Override
    public WatchlistResponseDTO updateStatus(
            String userId,
            ContentType contentType,
            Long contentId,
            WatchStatus status) {

        Watchlist watchlist =
                watchlistRepository
                        .findByUserIdAndContentTypeAndContentId(
                                userId,
                                contentType,
                                contentId
                        )
                        .orElseThrow(() ->
                        new WatchlistNotFoundException(
                                "Watchlist item not found."
                        )
                        );

        watchlist.setStatus(status);
        watchlist.setUpdatedAt(Instant.now());

        Watchlist updated =
                watchlistRepository.save(watchlist);

        return watchlistMapper.toResponseDTO(updated);
    }


    // ==================== REMOVE ====================

    @Override
    public void removeFromWatchlist(
            String userId,
            ContentType contentType,
            Long contentId) {

        Watchlist watchlist =
                watchlistRepository
                        .findByUserIdAndContentTypeAndContentId(
                                userId,
                                contentType,
                                contentId
                        )
                        .orElseThrow(() ->
                          new WatchlistNotFoundException(
                                "Watchlist item not found."
                         )
                        );

        watchlistRepository.delete(watchlist);
    }


    // ==================== CHECK ====================

    @Override
    public boolean isInWatchlist(
            String userId,
            ContentType contentType,
            Long contentId) {

        return watchlistRepository
                .existsByUserIdAndContentTypeAndContentId(
                        userId,
                        contentType,
                        contentId
                );
    }
}