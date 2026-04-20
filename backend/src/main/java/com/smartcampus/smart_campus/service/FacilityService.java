package com.smartcampus.smart_campus.service;

import com.smartcampus.smart_campus.model.Facility;
import com.smartcampus.smart_campus.repository.FacilityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class FacilityService {

    private final FacilityRepository facilityRepository;

    public List<Facility> getAllFacilities(String search, String type, String location) {
        if (search != null && !search.isEmpty()) {
            return facilityRepository.findByNameContainingIgnoreCase(search);
        }
        if (type != null && !type.isEmpty()) {
            return facilityRepository.findByType(type);
        }
        if (location != null && !location.isEmpty()) {
            return facilityRepository.findByLocation(location);
        }
        return facilityRepository.findAll();
    }

    public Optional<Facility> getFacilityById(String id) {
        return facilityRepository.findById(id);
    }

    public Facility saveFacility(Facility facility) {
        return facilityRepository.save(facility);
    }

    public void deleteFacility(String id) {
        facilityRepository.deleteById(id);
    }
}
