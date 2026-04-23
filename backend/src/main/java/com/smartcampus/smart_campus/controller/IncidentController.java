package com.smartcampus.smart_campus.controller;

import com.smartcampus.smart_campus.model.Incident;
import com.smartcampus.smart_campus.service.IncidentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/incidents")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class IncidentController {

    private final IncidentService incidentService;

    @GetMapping
    public ResponseEntity<List<Incident>> getAllIncidents(
            @RequestParam(required = false) String status) {
        if (status != null) {
            return ResponseEntity.ok(incidentService.getIncidentsByStatus(status));
        }
        return ResponseEntity.ok(incidentService.getAllIncidents());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Incident> getIncidentById(@PathVariable String id) {
        return incidentService.getIncidentById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Incident> createIncident(@RequestBody Incident incident) {
        return ResponseEntity.ok(incidentService.saveIncident(incident));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Incident> updateIncidentStatus(
            @PathVariable String id, 
            @RequestParam String status,
            @RequestParam(required = false) String notes) {
        try {
            return ResponseEntity.ok(incidentService.updateIncidentStatus(id, status, notes));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteIncident(@PathVariable String id) {
        incidentService.deleteIncident(id);
        return ResponseEntity.noContent().build();
    }
}
