package com.smartcampus.smart_campus.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.time.LocalDateTime;

@Document(collection = "system_info")
public class SystemInfo {
    @Id
    private String id;
    private String status;
    private LocalDateTime initializedAt;

    public SystemInfo(String status, LocalDateTime initializedAt) {
        this.status = status;
        this.initializedAt = initializedAt;
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getInitializedAt() { return initializedAt; }
    public void setInitializedAt(LocalDateTime initializedAt) { this.initializedAt = initializedAt; }
}
