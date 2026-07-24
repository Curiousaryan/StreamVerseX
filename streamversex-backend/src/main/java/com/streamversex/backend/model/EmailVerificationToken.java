package com.streamversex.backend.model;

import java.time.Instant;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection="email_verification_tokens")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EmailVerificationToken {
	
	@Id
	private String id;
	
	@Indexed
	private String userId;
	
	@Indexed(unique=true)
	private String token;
	
	@Indexed(expireAfterSeconds = 0)
	private Instant expiryDate;

}
