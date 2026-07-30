package com.streamversex.backend.exception;

import java.time.Instant;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.streamversex.backend.dto.response.ApiErrorDTO;

import jakarta.servlet.http.HttpServletRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(EmailAlreadyExistsException.class)
    public ResponseEntity<ApiErrorDTO> handleEmailAlreadyExists(
            EmailAlreadyExistsException ex,
            HttpServletRequest request) {

        ApiErrorDTO error = ApiErrorDTO.builder()
                .timestamp(Instant.now())
                .status(HttpStatus.CONFLICT.value())
                .message(ex.getMessage())
                .path(request.getRequestURI())
                .build();

        return ResponseEntity.status(HttpStatus.CONFLICT).body(error);
    }

    @ExceptionHandler(UserNotFoundException.class)
    public ResponseEntity<ApiErrorDTO> handleUserNotFound(
            UserNotFoundException ex,
            HttpServletRequest request) {

        ApiErrorDTO error = ApiErrorDTO.builder()
                .timestamp(Instant.now())
                .status(HttpStatus.NOT_FOUND.value())
                .message(ex.getMessage())
                .path(request.getRequestURI())
                .build();

        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }

    @ExceptionHandler(InvalidCredentialsException.class)
    public ResponseEntity<ApiErrorDTO> handleInvalidCredentials(
            InvalidCredentialsException ex,
            HttpServletRequest request) {

        ApiErrorDTO error = ApiErrorDTO.builder()
                .timestamp(Instant.now())
                .status(HttpStatus.UNAUTHORIZED.value())
                .message(ex.getMessage())
                .path(request.getRequestURI())
                .build();

        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
    }

    @ExceptionHandler(EmailNotVerifiedException.class)
    public ResponseEntity<ApiErrorDTO> handleEmailNotVerified(
            EmailNotVerifiedException ex,
            HttpServletRequest request) {

        ApiErrorDTO error = ApiErrorDTO.builder()
                .timestamp(Instant.now())
                .status(HttpStatus.FORBIDDEN.value())
                .message(ex.getMessage())
                .path(request.getRequestURI())
                .build();

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body(error);
    }

    @ExceptionHandler({InvalidTokenException.class, TokenExpiredException.class})
    public ResponseEntity<ApiErrorDTO> handleTokenException(
            RuntimeException ex,
            HttpServletRequest request) {

        ApiErrorDTO error = ApiErrorDTO.builder()
                .timestamp(Instant.now())
                .status(HttpStatus.BAD_REQUEST.value())
                .message(ex.getMessage())
                .path(request.getRequestURI())
                .build();

        return ResponseEntity.badRequest().body(error);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiErrorDTO> handleValidation(
            MethodArgumentNotValidException ex,
            HttpServletRequest request) {

    	String message = ex.getBindingResult()
    	        .getFieldErrors()
    	        .stream()
    	        .findFirst()
    	        .map(fieldError -> fieldError.getDefaultMessage())
    	        .orElse("Validation failed");
    	
        ApiErrorDTO error = ApiErrorDTO.builder()
                .timestamp(Instant.now())
                .status(HttpStatus.BAD_REQUEST.value())
                .message(message)
                .path(request.getRequestURI())
                .build();

        return ResponseEntity.badRequest().body(error);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiErrorDTO> handleException(
            Exception ex,
            HttpServletRequest request) {

        ApiErrorDTO error = ApiErrorDTO.builder()
                .timestamp(Instant.now())
                .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
                .message("An unexpected error occurred. Please try again later.")
                .path(request.getRequestURI())
                .build();

        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
    }
    
    @ExceptionHandler(InvalidPasswordException.class)
    public ResponseEntity<ApiErrorDTO> handleInvalidPassword(
            InvalidPasswordException ex,
            HttpServletRequest request) {

        ApiErrorDTO error = ApiErrorDTO.builder()
                .timestamp(Instant.now())
                .status(HttpStatus.BAD_REQUEST.value())
                .message(ex.getMessage())
                .path(request.getRequestURI())
                .build();

        return ResponseEntity.badRequest().body(error);
    }
    
    @ExceptionHandler(FavoriteAlreadyExistsException.class)
    public ResponseEntity<ApiErrorDTO> handleFavoriteAlreadyExists(
            FavoriteAlreadyExistsException ex,
            HttpServletRequest request) {

    	ApiErrorDTO error = ApiErrorDTO.builder()
                .timestamp(Instant.now())
                .status(HttpStatus.CONFLICT.value())
                .message(ex.getMessage())
                .path(request.getRequestURI())
                .build();

        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(error);
    }
    
    @ExceptionHandler(FavoriteNotFoundException.class)
    public ResponseEntity<ApiErrorDTO> handleFavoriteNotFound(
            FavoriteNotFoundException ex,
            HttpServletRequest request) {

        ApiErrorDTO error = ApiErrorDTO.builder()
                .timestamp(Instant.now())
                .status(HttpStatus.NOT_FOUND.value())
                .message(ex.getMessage())
                .path(request.getRequestURI())
                .build();

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(error);
    }
    
    @ExceptionHandler(WatchlistAlreadyExistsException.class)
    public ResponseEntity<ApiErrorDTO> handleWatchlistAlreadyExists(
            WatchlistAlreadyExistsException ex,
            HttpServletRequest request) {

        ApiErrorDTO error = ApiErrorDTO.builder()
                .timestamp(Instant.now())
                .status(HttpStatus.CONFLICT.value())
                .message(ex.getMessage())
                .path(request.getRequestURI())
                .build();

        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(error);
    }
    
    @ExceptionHandler(WatchlistNotFoundException.class)
    public ResponseEntity<ApiErrorDTO> handleWatchlistNotFound(
            WatchlistNotFoundException ex,
            HttpServletRequest request) {

        ApiErrorDTO error = ApiErrorDTO.builder()
                .timestamp(Instant.now())
                .status(HttpStatus.NOT_FOUND.value())
                .message(ex.getMessage())
                .path(request.getRequestURI())
                .build();

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(error);
    }
    
    @ExceptionHandler(ReviewAlreadyExistsException.class)
    public ResponseEntity<ApiErrorDTO> handleReviewAlreadyExists(
            ReviewAlreadyExistsException ex,
            HttpServletRequest request) {

        ApiErrorDTO error = ApiErrorDTO.builder()
                .timestamp(Instant.now())
                .status(HttpStatus.CONFLICT.value())
                .message(ex.getMessage())
                .path(request.getRequestURI())
                .build();

        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(error);
    }
    
    @ExceptionHandler(ReviewNotFoundException.class)
    public ResponseEntity<ApiErrorDTO> handleReviewNotFound(
            ReviewNotFoundException ex,
            HttpServletRequest request) {

        ApiErrorDTO error = ApiErrorDTO.builder()
                .timestamp(Instant.now())
                .status(HttpStatus.NOT_FOUND.value())
                .message(ex.getMessage())
                .path(request.getRequestURI())
                .build();

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(error);
    }
    
    @ExceptionHandler(ReviewAccessDeniedException.class)
    public ResponseEntity<ApiErrorDTO> handleReviewAccessDenied(
            ReviewAccessDeniedException ex,
            HttpServletRequest request) {

        ApiErrorDTO error = ApiErrorDTO.builder()
                .timestamp(Instant.now())
                .status(HttpStatus.FORBIDDEN.value())
                .message(ex.getMessage())
                .path(request.getRequestURI())
                .build();

        return ResponseEntity
                .status(HttpStatus.FORBIDDEN)
                .body(error);
    }
    
    @ExceptionHandler(ProfileNotFoundException.class)
    public ResponseEntity<ApiErrorDTO> handleProfileNotFound(
            ProfileNotFoundException ex,
            HttpServletRequest request) {

        ApiErrorDTO error = ApiErrorDTO.builder()
                .timestamp(Instant.now())
                .status(HttpStatus.NOT_FOUND.value())
                .message(ex.getMessage())
                .path(request.getRequestURI())
                .build();

        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(error);
    }
}