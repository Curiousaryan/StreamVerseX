package com.streamversex.backend.repository;

import java.time.Instant;
import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.streamversex.backend.model.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {

	Optional<User> findByEmail(String email);
	
	boolean existsByEmail(String email);
	
	List<User> findByIsPremiumTrueAndSubscriptionExpiresAtBefore(
	        Instant currentTime
	);
	
}
