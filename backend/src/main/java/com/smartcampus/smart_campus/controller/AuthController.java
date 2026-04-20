package com.smartcampus.smart_campus.controller;

import com.smartcampus.smart_campus.dto.ApiResponse;
import com.smartcampus.smart_campus.dto.SignupRequest;
import com.smartcampus.smart_campus.model.User;
import com.smartcampus.smart_campus.service.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") // Vite dev server
public class AuthController {

    private final UserService userService;

    /**
     * POST /api/auth/signup
     * Accepts signup form data and saves a new user to MongoDB UniHub.users
     */
    @PostMapping("/signup")
    public ResponseEntity<ApiResponse> signup(@Valid @RequestBody SignupRequest request) {
        try {
            User createdUser = userService.registerUser(request);
            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(new ApiResponse(true, "Account created successfully! Welcome, " + createdUser.getFullName()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body(new ApiResponse(false, e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ApiResponse(false, "Something went wrong. Please try again."));
        }
    }
}
