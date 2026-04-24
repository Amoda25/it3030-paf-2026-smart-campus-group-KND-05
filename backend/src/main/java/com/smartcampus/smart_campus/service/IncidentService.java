package com.smartcampus.smart_campus.service;

import com.smartcampus.smart_campus.model.Incident;
import com.smartcampus.smart_campus.repository.IncidentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class IncidentService {

    private final IncidentRepository incidentRepository;

    public IncidentService(IncidentRepository incidentRepository) {
        this.incidentRepository = incidentRepository;
    }

    public List<Incident> getAllIncidents() {
        return incidentRepository.findAll();
    }

    public List<Incident> getIncidentsByStatus(String status) {
        return incidentRepository.findByStatus(status);
    }

    public Incident saveIncident(Incident incident) {
        if (incident.getStatus() == null) {
            incident.setStatus("OPEN");
        }
        return incidentRepository.save(incident);
    }

    public Optional<Incident> getIncidentById(String id) {
        return incidentRepository.findById(id);
    }

    public Incident updateIncidentStatus(String id, String status, String notes) {
        return incidentRepository.findById(id).map(incident -> {
            incident.setStatus(status);
            if (notes != null) incident.setResolutionNotes(notes);
            if ("RESOLVED".equals(status) || "CLOSED".equals(status)) {
                incident.setResolvedAt(LocalDateTime.now());
            }
            return incidentRepository.save(incident);
        }).orElseThrow(() -> new RuntimeException("Incident not found with id: " + id));
    }

    public void deleteIncident(String id) {
        incidentRepository.deleteById(id);
    }
}
