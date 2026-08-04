package com.streamversex.backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.streamversex.backend.model.ContentType;
import com.streamversex.backend.model.Review;

@Repository
public interface ReviewRepository
        extends MongoRepository<Review, String> {

    // All reviews for particular content
    List<Review> findByContentTypeAndContentIdOrderByCreatedAtDesc(
            ContentType contentType,
            Long contentId
    );

    // All reviews written by a user
    List<Review> findByUserIdOrderByCreatedAtDesc(
            String userId
    );

    // User's review for particular content
    Optional<Review> findByUserIdAndContentTypeAndContentId(
            String userId,
            ContentType contentType,
            Long contentId
    );

    // Duplicate prevention
    boolean existsByUserIdAndContentTypeAndContentId(
            String userId,
            ContentType contentType,
            Long contentId
    );

    // ==================== ADMIN ====================

    List<Review> findAllByOrderByCreatedAtDesc();

    List<Review> findByReviewTextContainingIgnoreCaseOrderByCreatedAtDesc(
            String keyword
    );

    long countByRating(Integer rating);
}