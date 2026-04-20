package com.smartcampus.smart_campus.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "facilities")
public class Facility {

    @Id
    private String id;

    private String name;

    private String type; // e.g., Lecture Hall, Lab, Meeting Room, Equipment

    private Integer capacity;

    private String location;

    private List<String> availabilityWindows; // e.g., ["08:00-12:00", "13:00-17:00"]

    private String status; // ACTIVE, OUT_OF_SERVICE

    private String description;

    private String imageUrl; // Optional image link for the catalogue
}
