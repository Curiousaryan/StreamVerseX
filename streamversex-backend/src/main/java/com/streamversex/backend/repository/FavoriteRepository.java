package com.streamversex.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.streamversex.backend.model.ContentType;
import com.streamversex.backend.model.Favorite;

@Repository
public interface FavoriteRepository
        extends MongoRepository<Favorite, String> {

    List<Favorite> findByUserIdOrderByCreatedAtDesc(String userId);

    Optional<Favorite> findByUserIdAndContentTypeAndContentId(
            String userId,
            ContentType contentType,
            Long contentId);

    boolean existsByUserIdAndContentTypeAndContentId(
            String userId,
            ContentType contentType,
            Long contentId);

    void deleteByUserIdAndContentTypeAndContentId(
            String userId,
            ContentType contentType,
            Long contentId);
}