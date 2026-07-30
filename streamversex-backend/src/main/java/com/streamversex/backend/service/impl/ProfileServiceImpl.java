package com.streamversex.backend.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.streamversex.backend.dto.request.UpdateProfileRequestDTO;
import com.streamversex.backend.dto.response.ProfileResponseDTO;
import com.streamversex.backend.exception.ProfileNotFoundException;
import com.streamversex.backend.mapper.ProfileMapper;
import com.streamversex.backend.model.User;
import com.streamversex.backend.repository.UserRepository;
import com.streamversex.backend.service.ImageUploadService;
import com.streamversex.backend.service.ProfileService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ProfileServiceImpl implements ProfileService {

    private final UserRepository userRepository;
    private final ProfileMapper profileMapper;
    private final ImageUploadService imageUploadService;


    // ==================== GET PROFILE ====================

    @Override
    public ProfileResponseDTO getProfile(String userId) {

        User user = getUser(userId);

        return profileMapper.toResponseDTO(user);
    }


    // ==================== UPDATE PROFILE ====================

    @Override
    public ProfileResponseDTO updateProfile(
            String userId,
            UpdateProfileRequestDTO request) {

        User user = getUser(userId);

        user.setName(request.getName().trim());

        User updatedUser = userRepository.save(user);

        return profileMapper.toResponseDTO(updatedUser);
    }


    // ==================== UPLOAD PROFILE IMAGE ====================

    @Override
    public ProfileResponseDTO uploadProfileImage(
            String userId,
            MultipartFile file) {

        User user = getUser(userId);

        validateProfileImage(file);

        String imageUrl =
                imageUploadService.uploadProfileImage(file);

        user.setProfileImageUrl(imageUrl);

        User updatedUser =
                userRepository.save(user);

        return profileMapper.toResponseDTO(updatedUser);
    }


    // ==================== VALIDATE IMAGE ====================

    private void validateProfileImage(MultipartFile file) {

        if (file == null || file.isEmpty()) {
            throw new IllegalArgumentException(
                    "Profile image is required."
            );
        }

        String contentType = file.getContentType();

        if (contentType == null ||
                !List.of(
                        "image/jpeg",
                        "image/png",
                        "image/webp"
                ).contains(contentType)) {

            throw new IllegalArgumentException(
                    "Only JPEG, PNG and WEBP images are allowed."
            );
        }
    }


    // ==================== FIND USER ====================

    private User getUser(String userId) {

        return userRepository.findById(userId)
                .orElseThrow(() ->
                        new ProfileNotFoundException(
                                "User profile not found."
                        )
                );
    }
}