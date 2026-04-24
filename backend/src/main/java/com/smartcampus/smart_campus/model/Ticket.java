package com.smartcampus.smart_campus.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "tickets")
public class Ticket {
    @Id
    private String id;
    private String ticketId;
    private String fullName;
    private String faculty;
    private String email;
    private String contactNumber;
    private String preferredTime;
    private String issueTitle;
    private String category;
    private String location;
    private String description;
    private String priority;
    private String status;
    private LocalDateTime submittedAt;
    private String technician;
    private String resolutionNote;
    private String rejectionReason;
    private List<Comment> comments;
    private List<String> images;

    public Ticket() {}

    public Ticket(String id, String ticketId, String fullName, String faculty, String email, String contactNumber, String preferredTime, String issueTitle, String category, String location, String description, String priority, String status, LocalDateTime submittedAt, String technician, String resolutionNote, String rejectionReason, List<Comment> comments, List<String> images) {
        this.id = id;
        this.ticketId = ticketId;
        this.fullName = fullName;
        this.faculty = faculty;
        this.email = email;
        this.contactNumber = contactNumber;
        this.preferredTime = preferredTime;
        this.issueTitle = issueTitle;
        this.category = category;
        this.location = location;
        this.description = description;
        this.priority = priority;
        this.status = status;
        this.submittedAt = submittedAt;
        this.technician = technician;
        this.resolutionNote = resolutionNote;
        this.rejectionReason = rejectionReason;
        this.comments = comments;
        this.images = images;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getTicketId() { return ticketId; }
    public void setTicketId(String ticketId) { this.ticketId = ticketId; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getFaculty() { return faculty; }
    public void setFaculty(String faculty) { this.faculty = faculty; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getContactNumber() { return contactNumber; }
    public void setContactNumber(String contactNumber) { this.contactNumber = contactNumber; }
    public String getPreferredTime() { return preferredTime; }
    public void setPreferredTime(String preferredTime) { this.preferredTime = preferredTime; }
    public String getIssueTitle() { return issueTitle; }
    public void setIssueTitle(String issueTitle) { this.issueTitle = issueTitle; }
    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getSubmittedAt() { return submittedAt; }
    public void setSubmittedAt(LocalDateTime submittedAt) { this.submittedAt = submittedAt; }
    public String getTechnician() { return technician; }
    public void setTechnician(String technician) { this.technician = technician; }
    public String getResolutionNote() { return resolutionNote; }
    public void setResolutionNote(String resolutionNote) { this.resolutionNote = resolutionNote; }
    public String getRejectionReason() { return rejectionReason; }
    public void setRejectionReason(String rejectionReason) { this.rejectionReason = rejectionReason; }
    public List<Comment> getComments() { return comments; }
    public void setComments(List<Comment> comments) { this.comments = comments; }
    public List<String> getImages() { return images; }
    public void setImages(List<String> images) { this.images = images; }

    public static class Comment {
        private String author;
        private String text;
        private LocalDateTime timestamp;

        public Comment() {}
        public Comment(String author, String text, LocalDateTime timestamp) {
            this.author = author;
            this.text = text;
            this.timestamp = timestamp;
        }

        public String getAuthor() { return author; }
        public void setAuthor(String author) { this.author = author; }
        public String getText() { return text; }
        public void setText(String text) { this.text = text; }
        public LocalDateTime getTimestamp() { return timestamp; }
        public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
    }
}
