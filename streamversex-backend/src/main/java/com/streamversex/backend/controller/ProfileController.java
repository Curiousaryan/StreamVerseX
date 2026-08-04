package com.streamversex.backend.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.streamversex.backend.dto.request.UpdateProfileRequestDTO;
import com.streamversex.backend.dto.response.ProfileResponseDTO;
import com.streamversex.backend.security.CustomUserDetails;
import com.streamversex.backend.service.ProfileService;

import io.swagger.v3.oas.annotations.Operation;

import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
@Tag(
        name = "Profile",
        description = "Manage authenticated user's profile information and profile image."
)
public class ProfileController {

    private final ProfileService profileService;

    // ==================== GET PROFILE ====================

    @Operation(
            summary = "Get Profile",
            description = "Returns the authenticated user's profile information."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Profile retrieved successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @GetMapping
    public ResponseEntity<ProfileResponseDTO> getProfile(
            @AuthenticationPrincipal CustomUserDetails userDetails) {

        return ResponseEntity.ok(
                profileService.getProfile(
                        userDetails.getId()
                )
        );
    }

    // ==================== UPDATE PROFILE ====================

    @Operation(
            summary = "Update Profile",
            description = "Updates the authenticated user's profile information."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Profile updated successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @PutMapping
    public ResponseEntity<ProfileResponseDTO> updateProfile(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @org.springframework.web.bind.annotation.RequestBody UpdateProfileRequestDTO request) {

        return ResponseEntity.ok(
                profileService.updateProfile(
                        userDetails.getId(),
                        request
                )
        );
    }

    // ==================== UPLOAD PROFILE IMAGE ====================

    @Operation(
            summary = "Upload Profile Image",
            description = "Uploads or replaces the authenticated user's profile image."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Profile image uploaded successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid image"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @PostMapping(
            value = "/image",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    public ResponseEntity<ProfileResponseDTO> uploadProfileImage(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @RequestPart("file") MultipartFile file) {

        return ResponseEntity.ok(
                profileService.uploadProfileImage(
                        userDetails.getId(),
                        file
                )
        );
    }
}