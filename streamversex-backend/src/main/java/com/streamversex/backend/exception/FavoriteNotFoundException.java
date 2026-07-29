package com.streamversex.backend.exception;

public class FavoriteNotFoundException extends RuntimeException {

    public FavoriteNotFoundException(String message) {
        super(message);
    }
}