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
    private String userId; // User SID
    private String userName;
    private String userFaculty;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    private String status = "PENDING"; // PENDING, APPROVED, REJECTED
    private String purpose;
    private int participantsCount;
    
    // Special Requirements
    private boolean projectorNeeded;
    private boolean microphoneNeeded;
    private boolean acNeeded;
    private String seatingArrangement;
    
    private String notes;
    private LocalDateTime createdAt = LocalDateTime.now();
}

