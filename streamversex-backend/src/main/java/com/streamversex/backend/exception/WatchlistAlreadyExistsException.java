package com.streamversex.backend.exception;

public class WatchlistAlreadyExistsException extends RuntimeException {

    public WatchlistAlreadyExistsException(String message) {
        super(message);
    }
}