package com.smartcampus.smart_campus.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @GetMapping("/health")
    public String healthCheck() {
        return "ALIVE";
    }

    @PostMapping("/google")
    public ResponseEntity<?> googleLogin(@RequestBody Map<String, Object> requestData) {
        System.out.println("DEBUG: Reached /google endpoint with payload: " + requestData);
        
        return ResponseEntity.ok(Map.of(
                "token", "test-jwt",
                "user", Map.of(
                        "email", "test@test.com",
                        "role", "USER"
                )
        ));
    }
}
