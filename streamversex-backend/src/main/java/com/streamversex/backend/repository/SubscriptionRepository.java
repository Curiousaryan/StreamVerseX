package com.streamversex.backend.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.streamversex.backend.model.Subscription;
import com.streamversex.backend.model.SubscriptionStatus;

@Repository
public interface SubscriptionRepository
        extends MongoRepository<Subscription, String> {

    Optional<Subscription> findFirstByUserIdAndStatusOrderByExpiryDateDesc(
            String userId,
            SubscriptionStatus status
    );
}