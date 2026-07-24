package com.streamversex.backend.security;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.streamversex.backend.model.User;
import com.streamversex.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService{

	private final UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		User user=userRepository.findByEmail(username)
				.orElseThrow(()-> 
				                 new UsernameNotFoundException("User not found"));
		return new CustomUserDetails(
				user.getId(),
				 user.getEmail(),
	                user.getPasswordHash(),
	                user.getRole(),
	                user.isBlocked(),
	                user.isEmailVerified()); 
	}
	
	public UserDetails loadUserById(String userId) {

	    User user = userRepository.findById(userId)
	            .orElseThrow(() ->
	                    new UsernameNotFoundException("User not found"));

	    return new CustomUserDetails(
	            user.getId(),
	            user.getEmail(),
	            user.getPasswordHash(),
	            user.getRole(),
	            user.isBlocked(),
	            user.isEmailVerified()
	    );
	}
	
	
}
