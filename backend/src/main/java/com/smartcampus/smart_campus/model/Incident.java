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
@Document(collection = "incidents")
public class Incident {

    @Id
    private String id;

    private String facilityId;
    private String facilityName;
    private String reporterName;
    
    private String issueType; // ELECTRICAL, PLUMBING, IT, CLEANING, SECURITY
    private String severity; // LOW, MEDIUM, HIGH, CRITICAL
    private String status; // OPEN, IN_PROGRESS, RESOLVED, CLOSED
    
    private String description;
    private String resolutionNotes;

    private LocalDateTime createdAt = LocalDateTime.now();
    private LocalDateTime resolvedAt;
}
