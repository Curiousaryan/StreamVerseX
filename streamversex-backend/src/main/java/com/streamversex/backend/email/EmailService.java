package com.streamversex.backend.email;

public interface EmailService {
	
	void sendVerificationEmail(String toEmail, String userName, String verificationToken );
	
	void sendPasswordResetEmail(String to, String token);
}
