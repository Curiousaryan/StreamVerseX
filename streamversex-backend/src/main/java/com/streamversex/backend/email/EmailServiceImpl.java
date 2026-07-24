package com.streamversex.backend.email;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class EmailServiceImpl implements EmailService {
	
	private final JavaMailSender mailSender;
	
	@Value("${app.base-url}")
	private String baseUrl;
//	
//	@Value("${app.frontend-url}")
//	private String frontendUrl;
	
	@Value("${spring.mail.username}")
	private String fromEmail;

	@Override
	public void sendVerificationEmail(String toEmail, String userName, String verificationToken) {

		String verificationLink=
				baseUrl+ "/api/auth/verify-email?token=" + verificationToken;

		SimpleMailMessage message = new SimpleMailMessage();
		
		message.setFrom(fromEmail);
		message.setTo(toEmail);
		message.setSubject("Verify your StreamVerseX account");
		
		message.setText(
				 "Hello " + userName + ",\n\n" +
			                "Welcome to StreamVerseX!\n\n" +
			                "Please verify your email by clicking the link below:\n\n" +
			                verificationLink +
			                "\n\nThis link will expire in 24 hours.\n\n" +
			                "If you did not create this account, please ignore this email.\n\n" +
			                "Regards,\n" +
			                "StreamVerseX Team");
		
		try {
		    mailSender.send(message);
		} catch (Exception ex) {
		    throw new RuntimeException("Failed to send verification email.", ex);
		}
	}
	
	
	@Override
	public void sendPasswordResetEmail(String to, String token) {

		String resetLink = baseUrl +
		        "/reset-password?token=" + token;
		
	    SimpleMailMessage message = new SimpleMailMessage();

	    message.setFrom(fromEmail);
	    message.setTo(to);
	    message.setSubject("Reset Your StreamVerseX Password");

	    message.setText("""
	            Hello,

	            We received a request to reset your StreamVerseX password.

	            Click the link below to reset your password:

	            %s

	            This link will expire in 30 minutes.

	            If you didn't request a password reset, you can safely ignore this email.

	            Regards,
	            StreamVerseX Team
	            """.formatted(resetLink));

	    try {
	        mailSender.send(message);
	    } catch (Exception ex) {
	        throw new RuntimeException("Failed to send password reset email.", ex);
	    }
	}
	
	

}
