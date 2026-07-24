package com.streamversex.backend.service.impl;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.streamversex.backend.dto.request.ChangePasswordRequestDTO;
import com.streamversex.backend.dto.request.ForgotPasswordRequestDTO;
import com.streamversex.backend.dto.request.LoginRequestDTO;
import com.streamversex.backend.dto.request.RegisterRequestDTO;
import com.streamversex.backend.dto.request.ResetPasswordRequestDTO;
import com.streamversex.backend.dto.response.AuthResponseDTO;
import com.streamversex.backend.dto.response.MessageResponseDTO;
import com.streamversex.backend.email.EmailService;
import com.streamversex.backend.exception.EmailAlreadyExistsException;
import com.streamversex.backend.exception.EmailNotVerifiedException;
import com.streamversex.backend.exception.InvalidCredentialsException;
import com.streamversex.backend.exception.InvalidPasswordException;
import com.streamversex.backend.exception.InvalidTokenException;
import com.streamversex.backend.exception.TokenExpiredException;
import com.streamversex.backend.exception.UserNotFoundException;
import com.streamversex.backend.model.EmailVerificationToken;
import com.streamversex.backend.model.PasswordResetToken;
import com.streamversex.backend.model.User;
import com.streamversex.backend.repository.EmailVerificationTokenRepository;
import com.streamversex.backend.repository.PasswordResetTokenRepository;
import com.streamversex.backend.repository.UserRepository;
import com.streamversex.backend.service.AuthService;
import com.streamversex.backend.util.JwtUtil;
import com.streamversex.backend.util.TokenGenerator;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final EmailVerificationTokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final EmailService emailService;
    private final PasswordResetTokenRepository passwordResetTokenRepository;

    @Override
    public MessageResponseDTO register(RegisterRequestDTO request) {

        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new EmailAlreadyExistsException("Email is already registered.");
        }

        // Create new user
        User user = User.builder()
                .name(request.getName())
                .email(request.getEmail())
                .passwordHash(passwordEncoder.encode(request.getPassword()))
                .build();

        // Save user
        User savedUser = userRepository.save(user);

        // Remove old verification token if exists
        tokenRepository.findByUserId(savedUser.getId())
                .ifPresent(existingToken ->
                        tokenRepository.deleteById(existingToken.getId()));

        // Generate verification token
        String verificationToken = TokenGenerator.generateToken();

        EmailVerificationToken emailToken = EmailVerificationToken.builder()
                .userId(savedUser.getId())
                .token(verificationToken)
                .expiryDate(Instant.now().plus(24, ChronoUnit.HOURS))
                .build();

        // Save verification token
        tokenRepository.save(emailToken);

        // Send verification email
        emailService.sendVerificationEmail(
                savedUser.getEmail(),
                savedUser.getName(),
                verificationToken
        );

        // Return success response
        return MessageResponseDTO.builder()
                .message("Registration successful. Please verify your email.")
                .build();
    }

    @Override
    public AuthResponseDTO login(LoginRequestDTO request) {

        // Find user by email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->
                        new InvalidCredentialsException("Invalid email or password."));

        // Check password
        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new InvalidCredentialsException("Invalid email or password.");
        }

        // Check email verification
        if (!user.isEmailVerified()) {
            throw new EmailNotVerifiedException(
                    "Please verify your email before logging in.");
        }

        // Check blocked account
        if (user.isBlocked()) {
            throw new InvalidCredentialsException(
                    "Your account has been blocked. Please contact support.");
        }

        // Generate JWT
        String jwtToken = jwtUtil.generateToken(user);

        // Return response
        return AuthResponseDTO.builder()
                .token(jwtToken)
                .userId(user.getId())
                .name(user.getName())
                .email(user.getEmail())
                .role(user.getRole())
                .build();
    }

    @Override
    public MessageResponseDTO verifyEmail(String token) {

        // Find verification token
        EmailVerificationToken verificationToken = tokenRepository.findByToken(token)
                .orElseThrow(() ->
                        new InvalidTokenException("Invalid verification token."));

        // Check token expiry
        if (verificationToken.getExpiryDate().isBefore(Instant.now())) {

            tokenRepository.delete(verificationToken);

            throw new TokenExpiredException(
                    "Verification token has expired.");
        }

        // Find user
        User user = userRepository.findById(verificationToken.getUserId())
                .orElseThrow(() ->
                        new UserNotFoundException("User not found."));

        // Already verified
        if (user.isEmailVerified()) {

            tokenRepository.delete(verificationToken);

            return MessageResponseDTO.builder()
                    .message("Email is already verified.")
                    .build();
        }

        // Verify email
        user.setEmailVerified(true);

        userRepository.save(user);

        // Delete verification token
        tokenRepository.delete(verificationToken);

        return MessageResponseDTO.builder()
                .message("Email verified successfully.")
                .build();
    }
    
    @Override
    public MessageResponseDTO forgotPassword(ForgotPasswordRequestDTO request) {

        // Find user by email
        User user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() ->  new UserNotFoundException("User not found."));

        // Ensure email is verified
        if (!user.isEmailVerified()) {
            throw new EmailNotVerifiedException("Please verify your email first.");
        }

        // Delete any existing reset token
        passwordResetTokenRepository.deleteByUserId(user.getId());

        // Generate a new token
        String token = TokenGenerator.generateToken();

        // Create token entity
        PasswordResetToken passwordResetToken = PasswordResetToken.builder()
                .token(token)
                .userId(user.getId())
                .createdAt(LocalDateTime.now())
                .expiryDate(LocalDateTime.now().plusMinutes(30))
                .build();

        // Save token
        passwordResetTokenRepository.save(passwordResetToken);

        // Send email
        emailService.sendPasswordResetEmail(user.getEmail(), token);

        return MessageResponseDTO.builder()
                .message("Password reset link has been sent to your email.")
                .build();
    }
    
    @Override
    public MessageResponseDTO resetPassword(ResetPasswordRequestDTO request) {

        // Find reset token
        PasswordResetToken resetToken = passwordResetTokenRepository
                .findByToken(request.getToken())
                .orElseThrow(() -> new InvalidTokenException("Invalid password reset token."));

        // Check token expiry
        if (resetToken.getExpiryDate().isBefore(LocalDateTime.now())) {
            passwordResetTokenRepository.delete(resetToken);
            throw new TokenExpiredException("Password reset token has expired.");
        }

        // Find user
        User user = userRepository.findById(resetToken.getUserId())
                .orElseThrow(() -> new  UserNotFoundException("User not found."));

        // Encode new password
        user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));

        // Save updated password
        userRepository.save(user);

        // Delete used token
        passwordResetTokenRepository.delete(resetToken);

        return MessageResponseDTO.builder()
                .message("Password has been reset successfully.")
                .build();
    }
    
    @Override
    public MessageResponseDTO changePassword(
            String userId,
            ChangePasswordRequestDTO request) {

        // Find logged-in user
        User user = userRepository.findById(userId)
                .orElseThrow(() ->
                        new UserNotFoundException("User not found."));

        // Verify current password
        if (!passwordEncoder.matches(
                request.getCurrentPassword(),
                user.getPasswordHash())) {

            throw new InvalidPasswordException(
                    "Current password is incorrect.");
        }

        // Prevent using the same password again
        if (passwordEncoder.matches(
                request.getNewPassword(),
                user.getPasswordHash())) {

            throw new InvalidPasswordException(
                    "New password cannot be the same as the current password.");
        }

        // Encrypt new password
        user.setPasswordHash(
                passwordEncoder.encode(request.getNewPassword()));

        // Save updated password
        userRepository.save(user);

        return MessageResponseDTO.builder()
                .message("Password changed successfully.")
                .build();
    }

}