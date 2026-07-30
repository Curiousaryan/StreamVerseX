package com.streamversex.backend.dto.response;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileResponseDTO {

    private String id;
    private String name;
    private String email;
    private String profileImageUrl;

    private boolean emailVerified;
    private boolean premium;

    private Instant createdAt;
    private Instant updatedAt;
}