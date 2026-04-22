package com.smartcampus.smart_campus.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "tickets")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Ticket {
    @Id
    private String id;
    private String ticketId; // e.g., INC-1001
    private String fullName;
    private String email;
    private String contactNumber;
    private String preferredTime;
    private String issueTitle;
    private String category;
    private String location;
    private String description;
    private String priority;
    private String status; // OPEN, IN_PROGRESS, RESOLVED
    private LocalDateTime submittedAt;
    private String technician; // Not Assigned or technician name
}
