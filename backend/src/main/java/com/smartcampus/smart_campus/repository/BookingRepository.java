package com.smartcampus.smart_campus.repository;

import com.smartcampus.smart_campus.model.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface BookingRepository extends MongoRepository<Booking, String> {
    List<Booking> findByUserId(String userId);
    List<Booking> findByFacilityId(String facilityId);
    List<Booking> findByDate(String date);
}
