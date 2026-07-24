package com.streamversex.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.streamversex.backend.dto.request.ChangePasswordRequestDTO;
import com.streamversex.backend.dto.request.ForgotPasswordRequestDTO;
import com.streamversex.backend.dto.request.LoginRequestDTO;
import com.streamversex.backend.dto.request.RegisterRequestDTO;
import com.streamversex.backend.dto.request.ResetPasswordRequestDTO;
import com.streamversex.backend.dto.response.AuthResponseDTO;
import com.streamversex.backend.dto.response.MessageResponseDTO;
import com.streamversex.backend.security.CustomUserDetails;
import com.streamversex.backend.service.AuthService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Validated
public class AuthController {
	
	private final AuthService authService;
	
	
	@PostMapping("/register")
	public ResponseEntity<MessageResponseDTO> register(
			@Valid @RequestBody RegisterRequestDTO request){
		
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(authService.register(request));
	}

		
	@PostMapping("/login")
	public ResponseEntity<AuthResponseDTO> login(
			@Valid @RequestBody LoginRequestDTO request){
		
		return ResponseEntity.ok(authService.login(request));
	}
	
	 @GetMapping("/verify-email")
	    public ResponseEntity<MessageResponseDTO> verifyEmail(
	            @RequestParam String token) {

	        return ResponseEntity.ok(authService.verifyEmail(token));
	    }
	 
	 @PostMapping("/forgot-password")
	 public ResponseEntity<MessageResponseDTO> forgotPassword(
	         @Valid @RequestBody ForgotPasswordRequestDTO request) {

	     return ResponseEntity.ok(authService.forgotPassword(request));
	 }
	 
	 @PostMapping("/reset-password")
	 public ResponseEntity<MessageResponseDTO> resetPassword(
	         @Valid @RequestBody ResetPasswordRequestDTO request) {

	     return ResponseEntity.ok(authService.resetPassword(request));
	 }
	
	 @PostMapping("/change-password")
	 public ResponseEntity<MessageResponseDTO> changePassword(
	         Authentication authentication,
	         @Valid @RequestBody ChangePasswordRequestDTO request) {

	     CustomUserDetails userDetails =
	             (CustomUserDetails) authentication.getPrincipal();

	     return ResponseEntity.ok(
	             authService.changePassword(
	                     userDetails.getId(),
	                     request));
	 }
}
