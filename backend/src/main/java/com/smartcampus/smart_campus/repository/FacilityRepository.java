package com.smartcampus.smart_campus.repository;

import com.smartcampus.smart_campus.model.Facility;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface FacilityRepository extends MongoRepository<Facility, String> {
    
    List<Facility> findByType(String type);
    
    List<Facility> findByLocation(String location);
    
    List<Facility> findByStatus(String status);
    
    List<Facility> findByNameContainingIgnoreCase(String name);
}
