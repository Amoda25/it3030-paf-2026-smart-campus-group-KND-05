package com.smartcampus.smart_campus.controller;

import com.smartcampus.smart_campus.model.User;
import com.smartcampus.smart_campus.model.Role;
import com.smartcampus.smart_campus.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AdminController {

    private final UserRepository userRepository;
    private final FacilityRepository facilityRepository;
    private final BookingRepository bookingRepository;
    private final IncidentRepository incidentRepository;

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getSystemStats() {
        Map<String, Object> stats = new HashMap<>();
        stats.put("totalUsers", userRepository.count());
        stats.put("totalFacilities", facilityRepository.count());
        stats.put("activeBookings", bookingRepository.findAll().size()); // Simplified
        stats.put("openIncidents", incidentRepository.findByStatus("OPEN").size());
        stats.put("activeTechnicians", userRepository.findAll().stream().filter(u -> Role.TECHNICIAN.equals(u.getRole())).count());
        return ResponseEntity.ok(stats);
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userRepository.findAll());
    }

    @PatchMapping("/users/{id}/role")
    public ResponseEntity<User> updateUserRole(@PathVariable String id, @RequestParam String role) {
        return userRepository.findById(id).map(user -> {
            try {
                user.setRole(Role.valueOf(role.toUpperCase()));
                return ResponseEntity.ok(userRepository.save(user));
            } catch (IllegalArgumentException e) {
                return ResponseEntity.badRequest().<User>build();
            }
        }).orElse(ResponseEntity.notFound().build());
    }
}
