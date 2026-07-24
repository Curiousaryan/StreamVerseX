package com.streamversex.backend.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "password_reset_tokens")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PasswordResetToken {

    @Id
    private String id;

    @Indexed(unique = true)
    private String token;

    @Indexed
    private String userId;

    @Indexed(expireAfterSeconds = 0)
    private LocalDateTime expiryDate;

    private LocalDateTime createdAt;
}