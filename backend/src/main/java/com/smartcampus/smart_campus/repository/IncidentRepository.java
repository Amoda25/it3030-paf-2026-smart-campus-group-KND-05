package com.smartcampus.smart_campus.repository;

import com.smartcampus.smart_campus.model.Incident;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface IncidentRepository extends MongoRepository<Incident, String> {
    List<Incident> findByStatus(String status);
    List<Incident> findByFacilityId(String facilityId);
    List<Incident> findBySeverity(String severity);
}
