package com.smartcampus.smart_campus.model;

<<<<<<< HEAD
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;
=======
>>>>>>> db8918fe225b4ee326d5b1a6240e8dd2431d7a0a
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

<<<<<<< HEAD
    @Indexed(unique = true)
=======
>>>>>>> db8918fe225b4ee326d5b1a6240e8dd2431d7a0a
    private String email;

    private String password;

<<<<<<< HEAD
    private String role;
=======
    private Role role;
>>>>>>> db8918fe225b4ee326d5b1a6240e8dd2431d7a0a

    @CreatedDate
    private LocalDateTime createdAt;

    @LastModifiedDate
    private LocalDateTime updatedAt;

<<<<<<< HEAD

=======
    // We can use @CreatedDate and @LastModifiedDate if we enable Auditing,
    // but for now let's keep it simple and set them in a pre-save hook or manually.
    // MongoDB doesn't have @PrePersist/@PreUpdate by default, so we'll handle this in the service or use a listener.
    // However, since the user already had these methods, I'll keep the fields and let the developer decide how to populate them,
    // or I'll just initialize them in a constructor or use @Builder.Default.
    
    @Builder.Default
    private LocalDateTime createdDate = LocalDateTime.now();
>>>>>>> db8918fe225b4ee326d5b1a6240e8dd2431d7a0a
}
