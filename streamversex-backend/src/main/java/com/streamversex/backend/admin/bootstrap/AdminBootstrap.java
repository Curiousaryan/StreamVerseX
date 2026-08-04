package com.streamversex.backend.admin.bootstrap;

import java.time.Instant;

import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.streamversex.backend.model.Role;
import com.streamversex.backend.model.User;
import com.streamversex.backend.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class AdminBootstrap implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        if (userRepository.existsByRole(Role.ADMIN)) {
            return;
        }

        User admin = User.builder()
                .name("System Administrator")
                .email("admin@streamversex.com")
                .passwordHash(passwordEncoder.encode("Admin@123"))
                .role(Role.ADMIN)
                .isEmailVerified(true)
                .isBlocked(false)
                .isPremium(false)
                .createdAt(Instant.now())
                .updatedAt(Instant.now())
                .build();

        userRepository.save(admin);

        System.out.println();
        System.out.println("======================================");
        System.out.println("Default Admin Created Successfully");
        System.out.println("Email : admin@streamversex.com");
        System.out.println("Password : Admin@123");
        System.out.println("======================================");
        System.out.println();
    }
}