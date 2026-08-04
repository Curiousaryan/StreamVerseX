package com.streamversex.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(
            AuthenticationConfiguration configuration)
            throws Exception {

        return configuration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(
            HttpSecurity http)
            throws Exception {

    	http
        .cors(cors -> {})
        .csrf(csrf -> csrf.disable())

            .sessionManagement(session ->
                session.sessionCreationPolicy(
                    SessionCreationPolicy.STATELESS
                )
            )

            .authorizeHttpRequests(auth -> auth

            	    // ==================== PUBLIC ====================

            	    .requestMatchers(
            	        "/api/auth/register",
            	        "/api/auth/login",
            	        "/api/auth/verify-email",
            	        "/api/auth/forgot-password",
            	        "/api/auth/reset-password",

            	        // Swagger
            	        "/swagger-ui/**",
            	        "/v3/api-docs/**",
            	        "/webjars/**",

            	        // Test Page
            	        "/payment-test.html"
            	    )
            	    .permitAll()

            	    // ==================== ADMIN ====================

            	    .requestMatchers("/api/admin/**")
            	    .hasRole("ADMIN")

            	    // ==================== AUTHENTICATED ====================

            	    .requestMatchers(
            	        "/api/auth/change-password"
            	    )
            	    .authenticated()

            	    // ==================== ALL OTHER APIs ====================

            	    .anyRequest()
            	    .authenticated()
            	)

            .addFilterBefore(
                jwtAuthenticationFilter,
                UsernamePasswordAuthenticationFilter.class
            );

        return http.build();
    }
}