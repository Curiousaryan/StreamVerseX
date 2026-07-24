package com.streamversex.backend.util;

import java.util.UUID;

public final class TokenGenerator {

	private TokenGenerator() {
		throw new IllegalStateException("Utility class");
	}
	
	public static String generateToken() {
		return UUID.randomUUID().toString();
				
	}
}
