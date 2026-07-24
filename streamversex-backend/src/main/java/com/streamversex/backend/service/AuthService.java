package com.streamversex.backend.service;

import com.streamversex.backend.dto.request.ChangePasswordRequestDTO;
import com.streamversex.backend.dto.request.ForgotPasswordRequestDTO;
import com.streamversex.backend.dto.request.LoginRequestDTO;
import com.streamversex.backend.dto.request.RegisterRequestDTO;
import com.streamversex.backend.dto.request.ResetPasswordRequestDTO;
import com.streamversex.backend.dto.response.AuthResponseDTO;
import com.streamversex.backend.dto.response.MessageResponseDTO;

public interface AuthService {
	
	 MessageResponseDTO register(RegisterRequestDTO request);

	    AuthResponseDTO login(LoginRequestDTO request);

	    MessageResponseDTO verifyEmail(String token);
	    
	    MessageResponseDTO forgotPassword(ForgotPasswordRequestDTO request);

	    MessageResponseDTO resetPassword(ResetPasswordRequestDTO request);

	    MessageResponseDTO changePassword(
	            String userId,
	            ChangePasswordRequestDTO request);
}
