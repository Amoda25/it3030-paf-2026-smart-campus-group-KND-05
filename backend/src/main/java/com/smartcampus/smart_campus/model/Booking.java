package com.smartcampus.smart_campus.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "bookings")
public class Booking {

    @Id
    private String id;

    private String facilityId;
    private String facilityName;
    private String userId;
    private String userName;
    
    private String date; // e.g., "2026-04-25"
    private String timeSlot; // e.g., "08:00-10:00"
    
    private String status; // PENDING, APPROVED, REJECTED, CANCELLED
    
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
