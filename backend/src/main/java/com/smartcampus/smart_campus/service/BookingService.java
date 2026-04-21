package com.smartcampus.smart_campus.service;

import com.smartcampus.smart_campus.model.Booking;
import com.smartcampus.smart_campus.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public Booking saveBooking(Booking booking) {
        return bookingRepository.save(booking);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public List<Booking> getBookingsBySid(String sid) {
        return bookingRepository.findBySid(sid);
    }
}
