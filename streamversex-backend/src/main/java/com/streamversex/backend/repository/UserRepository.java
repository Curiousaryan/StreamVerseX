package com.streamversex.backend.repository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.streamversex.backend.model.Role;
import com.streamversex.backend.model.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

	Optional<User> findByEmail(String email);
	
	boolean existsByEmail(String email);
	
	List<User> findByIsPremiumTrueAndSubscriptionExpiresAtBefore(
	        Instant currentTime
	);
	
	
	 // ==================== ADMIN ====================

    long countByIsBlockedFalse();

    long countByIsBlockedTrue();

    long countByIsPremiumTrue();

    List<User> findByIsPremiumTrue();

    List<User> findByIsBlockedTrue();

    List<User> findByIsBlockedFalse();
    
    List<User> findAllByOrderByCreatedAtDesc();

    List<User> findByNameContainingIgnoreCaseOrEmailContainingIgnoreCase(
            String name,
            String email);
    
    List<User> findByIsPremiumTrueOrderBySubscriptionExpiresAtAsc();

    List<User> findByIsPremiumTrueAndNameContainingIgnoreCaseOrIsPremiumTrueAndEmailContainingIgnoreCase(
            String name,
            String email
    );
    
    long countByIsEmailVerifiedTrue();
    
    long countByCreatedAtAfter(
            Instant instant
    );
    
    boolean existsByRole(Role role);

  }
