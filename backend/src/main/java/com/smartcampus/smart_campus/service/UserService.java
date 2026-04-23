package com.smartcampus.smart_campus.service;

import com.smartcampus.smart_campus.dto.SignupRequest;
import com.smartcampus.smart_campus.dto.LoginRequest;
import com.smartcampus.smart_campus.model.Role;
import com.smartcampus.smart_campus.model.User;
import com.smartcampus.smart_campus.repository.UserRepository;
import com.smartcampus.smart_campus.security.JwtUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService userDetailsService;

    public Map<String, Object> registerUser(SignupRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email is already registered");
        }

        User user = User.builder()
                .fullName(request.getFullName())
                .email(request.getEmail().toLowerCase().trim())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole() != null ? Role.valueOf(request.getRole().toUpperCase()) : Role.USER)
                .build();

        userRepository.save(user);
        return loginAfterRegister(user.getEmail());
    }

    private Map<String, Object> loginAfterRegister(String email) {
        UserDetails userDetails = userDetailsService.loadUserByUsername(email);
        String token = jwtUtils.generateToken(userDetails);
        
        User user = userRepository.findByEmail(email).get();
        
        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", user);
        return response;
    }

    public Map<String, Object> authenticateUser(LoginRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        UserDetails userDetails = userDetailsService.loadUserByUsername(request.getEmail());
        String token = jwtUtils.generateToken(userDetails);
        
        User user = userRepository.findByEmail(request.getEmail()).get();

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", user);
        return response;
    }

    private final com.smartcampus.smart_campus.security.GoogleTokenVerifier googleTokenVerifier;

    public Map<String, Object> processGoogleLogin(String idToken) throws Exception {
        com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload payload = googleTokenVerifier.verify(idToken);
        
        String email = payload.getEmail();
        String name = (String) payload.get("name");

        User user = userRepository.findByEmail(email).orElseGet(() -> {
            User newUser = User.builder()
                    .email(email)
                    .fullName(name)
                    .password(passwordEncoder.encode("GOOGLE_OAUTH_PWD_" + System.currentTimeMillis()))
                    .role(Role.USER)
                    .build();
            return userRepository.save(newUser);
        });

        UserDetails userDetails = userDetailsService.loadUserByUsername(email);
        String token = jwtUtils.generateToken(userDetails);

        Map<String, Object> response = new HashMap<>();
        response.put("token", token);
        response.put("user", user);
        return response;
    }
}
