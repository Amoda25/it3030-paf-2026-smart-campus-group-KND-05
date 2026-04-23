package com.smartcampus.smart_campus.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

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
    private String resolutionNote;
    private String rejectionReason;
    private List<Comment> comments;
    private List<String> images;

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Comment {
        private String author;
        private String text;
        private LocalDateTime timestamp;
    }
}
