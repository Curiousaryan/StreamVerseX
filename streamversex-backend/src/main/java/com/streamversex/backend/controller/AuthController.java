package com.streamversex.backend.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.streamversex.backend.dto.request.ChangePasswordRequestDTO;
import com.streamversex.backend.dto.request.ForgotPasswordRequestDTO;
import com.streamversex.backend.dto.request.LoginRequestDTO;
import com.streamversex.backend.dto.request.RegisterRequestDTO;
import com.streamversex.backend.dto.request.ResetPasswordRequestDTO;
import com.streamversex.backend.dto.response.AuthResponseDTO;
import com.streamversex.backend.dto.response.MessageResponseDTO;
import com.streamversex.backend.security.CustomUserDetails;
import com.streamversex.backend.service.AuthService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@Validated
@Tag(
        name = "Authentication",
        description = "Authentication APIs for user registration, login, email verification and password management."
)
public class AuthController {

    private final AuthService authService;

    @Operation(
            summary = "Register User",
            description = "Registers a new user account and sends an email verification link."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "201", description = "User registered successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid request"),
            @ApiResponse(responseCode = "409", description = "Email already exists")
    })
    @PostMapping("/register")
    public ResponseEntity<MessageResponseDTO> register(
            @Valid @RequestBody RegisterRequestDTO request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(authService.register(request));
    }

    @Operation(
            summary = "User Login",
            description = "Authenticates a user and returns a JWT token."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Login successful"),
            @ApiResponse(responseCode = "401", description = "Invalid credentials")
    })
    @PostMapping("/login")
    public ResponseEntity<AuthResponseDTO> login(
            @Valid @RequestBody LoginRequestDTO request) {

        return ResponseEntity.ok(
                authService.login(request)
        );
    }

    @Operation(
            summary = "Verify Email",
            description = "Verifies a user's email address using the verification token."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Email verified successfully"),
            @ApiResponse(responseCode = "400", description = "Invalid or expired token")
    })
    @GetMapping("/verify-email")
    public ResponseEntity<MessageResponseDTO> verifyEmail(
            @RequestParam String token) {

        return ResponseEntity.ok(
                authService.verifyEmail(token)
        );
    }

    @Operation(
            summary = "Forgot Password",
            description = "Sends a password reset link to the registered email address."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Reset email sent successfully"),
            @ApiResponse(responseCode = "404", description = "User not found")
    })
    @PostMapping("/forgot-password")
    public ResponseEntity<MessageResponseDTO> forgotPassword(
            @Valid @RequestBody ForgotPasswordRequestDTO request) {

        return ResponseEntity.ok(
                authService.forgotPassword(request)
        );
    }

    @Operation(
            summary = "Reset Password",
            description = "Resets the user's password using the reset token."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Password reset successful"),
            @ApiResponse(responseCode = "400", description = "Invalid or expired token")
    })
    @PostMapping("/reset-password")
    public ResponseEntity<MessageResponseDTO> resetPassword(
            @Valid @RequestBody ResetPasswordRequestDTO request) {

        return ResponseEntity.ok(
                authService.resetPassword(request)
        );
    }

    @Operation(
            summary = "Change Password",
            description = "Allows an authenticated user to change their password."
    )
    @ApiResponses({
            @ApiResponse(responseCode = "200", description = "Password changed successfully"),
            @ApiResponse(responseCode = "401", description = "Unauthorized")
    })
    @PostMapping("/change-password")
    public ResponseEntity<MessageResponseDTO> changePassword(
            Authentication authentication,
            @Valid @RequestBody ChangePasswordRequestDTO request) {

        CustomUserDetails userDetails =
                (CustomUserDetails) authentication.getPrincipal();

        return ResponseEntity.ok(
                authService.changePassword(
                        userDetails.getId(),
                        request
                )
        );
    }
}