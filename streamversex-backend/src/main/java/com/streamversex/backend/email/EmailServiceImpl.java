package com.streamversex.backend.email;

import java.io.ByteArrayInputStream;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.InputStreamSource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;
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
	
	
	@Override
	public void sendInvoiceEmail(
	        String toEmail,
	        String customerName,
	        String invoiceNumber,
	        byte[] pdfBytes) {

	    try {

	        MimeMessage mimeMessage =
	                mailSender.createMimeMessage();

	        MimeMessageHelper helper =
	                new MimeMessageHelper(
	                        mimeMessage,
	                        true
	                );

	        helper.setFrom(fromEmail);
	        helper.setTo(toEmail);

	        helper.setSubject(
	                "Your StreamVerseX Invoice"
	        );

	        helper.setText(
	                """
	                Hello %s,

	                Thank you for subscribing to StreamVerseX Premium.

	                Your payment was successful.

	                Invoice Number:
	                %s

	                Your invoice is attached as a PDF.

	                Enjoy premium streaming!

	                Regards,
	                StreamVerseX Team
	                """
	                .formatted(
	                        customerName,
	                        invoiceNumber
	                )
	        );

	        helper.addAttachment(
	                "Invoice-" + invoiceNumber + ".pdf",
	                new InputStreamSource() {

	                    @Override
	                    public java.io.InputStream getInputStream() {
	                        return new ByteArrayInputStream(pdfBytes);
	                    }
	                }
	        );

	        mailSender.send(mimeMessage);

	    } catch (Exception ex) {

	        throw new RuntimeException(
	                "Failed to send invoice email.",
	                ex
	        );
	    }
	}
	
	
	@Override
	public void sendSubscriptionExpiredEmail(
	        String toEmail,
	        String customerName) {

	    SimpleMailMessage message = new SimpleMailMessage();

	    message.setFrom(fromEmail);
	    message.setTo(toEmail);

	    message.setSubject("Your StreamVerseX Premium Membership Has Expired");

	    message.setText("""
	            Hello %s,

	            Your StreamVerseX Premium subscription has expired.

	            Premium features have now been disabled.

	            Renew your subscription anytime to continue enjoying:

	            • AI Movie Recommendations
	            • AI Anime Recommendations
	            • AI Movie Summary
	            • AI Ending Explanation
	            • Compare Movies
	            • Ad-Free Premium Experience

	            Visit StreamVerseX to renew your membership.

	            Thank you for being with us.

	            Regards,
	            StreamVerseX Team
	            """.formatted(customerName));

	    try {
	        mailSender.send(message);
	    } catch (Exception ex) {
	        throw new RuntimeException(
	                "Failed to send subscription expiry email.",
	                ex
	        );
	    }
	}
	
	

}
