package com.streamversex.backend.controller;

import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.streamversex.backend.dto.request.UpdateProfileRequestDTO;
import com.streamversex.backend.dto.response.ProfileResponseDTO;
import com.streamversex.backend.security.CustomUserDetails;
import com.streamversex.backend.service.ProfileService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;


    // ==================== GET PROFILE ====================

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

    @PutMapping
    public ResponseEntity<ProfileResponseDTO> updateProfile(
            @AuthenticationPrincipal CustomUserDetails userDetails,
            @Valid @RequestBody UpdateProfileRequestDTO request) {

        return ResponseEntity.ok(
                profileService.updateProfile(
                        userDetails.getId(),
                        request
                )
        );
    }


    // ==================== UPLOAD PROFILE IMAGE ====================

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