package com.smartcampus.smart_campus.service;

import com.smartcampus.smart_campus.model.Booking;
import com.smartcampus.smart_campus.repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public List<Booking> getBookingsByUserId(String userId) {
        // Correcting the repository return type in thought: Repository should return List<Booking>
        // But for now I'll use the repository methods as defined or standard ones.
        return bookingRepository.findAll().stream()
                .filter(b -> b.getUserId().equals(userId))
                .toList();
    }

    public Booking createBooking(Booking booking) {
        booking.setStatus("PENDING");
        booking.setCreatedAt(LocalDateTime.now());
        booking.setUpdatedAt(LocalDateTime.now());
        return bookingRepository.save(booking);
    }

    public Optional<Booking> updateBookingStatus(String id, String status) {
        return bookingRepository.findById(id).map(booking -> {
            booking.setStatus(status);
            booking.setUpdatedAt(LocalDateTime.now());
            return bookingRepository.save(booking);
        });
    }

    public void deleteBooking(String id) {
        bookingRepository.deleteById(id);
    }
}
