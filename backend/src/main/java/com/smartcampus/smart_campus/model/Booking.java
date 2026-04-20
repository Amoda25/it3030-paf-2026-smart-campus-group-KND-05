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
    private String userId; // User who made the booking
    private String userName;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    private String status; // PENDING, APPROVED, REJECTED, CANCELLED
    private String purpose;
    private LocalDateTime createdAt = LocalDateTime.now();
}

