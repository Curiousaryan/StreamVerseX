package com.streamversex.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.streamversex.backend.model.ContentType;
import com.streamversex.backend.model.WatchStatus;
import com.streamversex.backend.model.Watchlist;

@Repository
public interface WatchlistRepository
        extends MongoRepository<Watchlist, String> {

    List<Watchlist> findByUserIdOrderByCreatedAtDesc(
            String userId);

    List<Watchlist> findByUserIdAndStatusOrderByUpdatedAtDesc(
            String userId,
            WatchStatus status);

    Optional<Watchlist> findByUserIdAndContentTypeAndContentId(
            String userId,
            ContentType contentType,
            Long contentId);

    boolean existsByUserIdAndContentTypeAndContentId(
            String userId,
            ContentType contentType,
            Long contentId);
}