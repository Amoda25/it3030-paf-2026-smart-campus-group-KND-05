package com.smartcampus.smart_campus.repository;

import com.smartcampus.smart_campus.model.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface BookingRepository extends MongoRepository<Booking, String> {
    
    List<Booking> findByUserId(String userId);
    
    List<Booking> findByFacilityId(String facilityId);
    
    @Query("{ 'facilityId': ?0, 'status': { $nin: ['CANCELLED', 'REJECTED'] }, " +
           "'$or': [ " +
           "  { 'startTime': { $lt: ?2 }, 'endTime': { $gt: ?1 } } " +
           "] }")
    List<Booking> findOverlappingBookings(String facilityId, LocalDateTime start, LocalDateTime end);
}
