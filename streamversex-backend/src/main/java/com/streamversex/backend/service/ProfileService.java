package com.streamversex.backend.service;

import org.springframework.web.multipart.MultipartFile;

import com.streamversex.backend.dto.request.UpdateProfileRequestDTO;
import com.streamversex.backend.dto.response.ProfileResponseDTO;

public interface ProfileService {

    // ==================== GET PROFILE ====================

    ProfileResponseDTO getProfile(String userId);


    // ==================== UPDATE PROFILE ====================

    ProfileResponseDTO updateProfile(
            String userId,
            UpdateProfileRequestDTO request
    );


    // ==================== UPLOAD PROFILE IMAGE ====================

    ProfileResponseDTO uploadProfileImage(
            String userId,
            MultipartFile file
    );
}