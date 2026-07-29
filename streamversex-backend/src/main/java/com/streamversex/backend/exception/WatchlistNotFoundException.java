package com.streamversex.backend.exception;

public class WatchlistNotFoundException extends RuntimeException {

    public WatchlistNotFoundException(String message) {
        super(message);
    }
}