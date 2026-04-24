package com.smartcampus.smart_campus.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;

@Document(collection = "bookings")
public class Booking {

    @Id
    private String id;

    private String facilityId;
    private String facilityName;
    private String userId;
    private String userName;
    private String userFaculty;

    private LocalDateTime startTime;
    private LocalDateTime endTime;

    private String status = "PENDING";
    private String purpose;
    private int participantsCount;
    
    private boolean projectorNeeded;
    private boolean microphoneNeeded;
    private boolean acNeeded;
    private String seatingArrangement;
    
    private String notes;
    private LocalDateTime createdAt = LocalDateTime.now();

    public Booking() {}

    public Booking(String id, String facilityId, String facilityName, String userId, String userName, String userFaculty, LocalDateTime startTime, LocalDateTime endTime, String status, String purpose, int participantsCount, boolean projectorNeeded, boolean microphoneNeeded, boolean acNeeded, String seatingArrangement, String notes, LocalDateTime createdAt) {
        this.id = id;
        this.facilityId = facilityId;
        this.facilityName = facilityName;
        this.userId = userId;
        this.userName = userName;
        this.userFaculty = userFaculty;
        this.startTime = startTime;
        this.endTime = endTime;
        this.status = status;
        this.purpose = purpose;
        this.participantsCount = participantsCount;
        this.projectorNeeded = projectorNeeded;
        this.microphoneNeeded = microphoneNeeded;
        this.acNeeded = acNeeded;
        this.seatingArrangement = seatingArrangement;
        this.notes = notes;
        this.createdAt = createdAt;
    }

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getFacilityId() { return facilityId; }
    public void setFacilityId(String facilityId) { this.facilityId = facilityId; }
    public String getFacilityName() { return facilityName; }
    public void setFacilityName(String facilityName) { this.facilityName = facilityName; }
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }
    public String getUserName() { return userName; }
    public void setUserName(String userName) { this.userName = userName; }
    public String getUserFaculty() { return userFaculty; }
    public void setUserFaculty(String userFaculty) { this.userFaculty = userFaculty; }
    public LocalDateTime getStartTime() { return startTime; }
    public void setStartTime(LocalDateTime startTime) { this.startTime = startTime; }
    public LocalDateTime getEndTime() { return endTime; }
    public void setEndTime(LocalDateTime endTime) { this.endTime = endTime; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public String getPurpose() { return purpose; }
    public void setPurpose(String purpose) { this.purpose = purpose; }
    public int getParticipantsCount() { return participantsCount; }
    public void setParticipantsCount(int participantsCount) { this.participantsCount = participantsCount; }
    public boolean isProjectorNeeded() { return projectorNeeded; }
    public void setProjectorNeeded(boolean projectorNeeded) { this.projectorNeeded = projectorNeeded; }
    public boolean isMicrophoneNeeded() { return microphoneNeeded; }
    public void setMicrophoneNeeded(boolean microphoneNeeded) { this.microphoneNeeded = microphoneNeeded; }
    public boolean isAcNeeded() { return acNeeded; }
    public void setAcNeeded(boolean acNeeded) { this.acNeeded = acNeeded; }
    public String getSeatingArrangement() { return seatingArrangement; }
    public void setSeatingArrangement(String seatingArrangement) { this.seatingArrangement = seatingArrangement; }
    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
}

