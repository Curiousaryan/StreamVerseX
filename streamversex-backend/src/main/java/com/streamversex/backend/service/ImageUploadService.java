package com.streamversex.backend.service;

import org.springframework.web.multipart.MultipartFile;

public interface ImageUploadService {

    String uploadProfileImage(MultipartFile file);
}