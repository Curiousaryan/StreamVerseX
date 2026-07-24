package com.streamversex.backend.repository;

import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.streamversex.backend.model.EmailVerificationToken;

@Repository
public interface EmailVerificationTokenRepository
        extends MongoRepository<EmailVerificationToken, String> {

    Optional<EmailVerificationToken> findByToken(String token);

    Optional<EmailVerificationToken> findByUserId(String userId);

    void deleteByUserId(String userId);

    void deleteByToken(String token);
}
