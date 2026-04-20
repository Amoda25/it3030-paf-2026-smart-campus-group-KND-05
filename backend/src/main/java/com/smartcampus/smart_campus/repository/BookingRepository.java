package com.smartcampus.smart_campus.repository;

import com.smartcampus.smart_campus.model.Booking;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends MongoRepository<Booking, String> {
    List<Booking> findBySid(String sid);
}
