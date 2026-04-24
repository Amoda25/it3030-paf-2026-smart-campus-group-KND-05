package com.smartcampus.smart_campus.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Document(collection = "users")
public class User {

    @Id
    private String id;

    private String fullName;

    private String email;

    private String password;

    private Role role;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    // We can use @CreatedDate and @LastModifiedDate if we enable Auditing,
    // but for now let's keep it simple and set them in a pre-save hook or manually.
    // MongoDB doesn't have @PrePersist/@PreUpdate by default, so we'll handle this in the service or use a listener.
    // However, since the user already had these methods, I'll keep the fields and let the developer decide how to populate them,
    // or I'll just initialize them in a constructor or use @Builder.Default.
    
    @Builder.Default
    private LocalDateTime createdDate = LocalDateTime.now();
}
