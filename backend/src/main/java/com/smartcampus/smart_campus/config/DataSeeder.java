package com.smartcampus.smart_campus.config;

import com.smartcampus.smart_campus.model.Facility;
import com.smartcampus.smart_campus.repository.FacilityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataSeeder implements CommandLineRunner {

    private final FacilityRepository facilityRepository;

    public DataSeeder(FacilityRepository facilityRepository) {
        this.facilityRepository = facilityRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (facilityRepository.count() == 0) {
            Facility hall1 = new Facility(null, "Grand Auditorium", "Lecture Hall", 500, "Block A, 1st Floor", Arrays.asList("08:00-12:00", "13:00-18:00"), "ACTIVE", "Main auditorium with state-of-the-art audio equipment.", "https://images.unsplash.com/photo-1517502884422-41eaadeff171");
            Facility lab1 = new Facility(null, "Advanced Robotics Lab", "Lab", 30, "Tech Wing, Ground Floor", Arrays.asList("09:00-17:00"), "ACTIVE", "Specialized robotics lab equipped with robotic arms and 3D printers.", "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158");
            Facility room1 = new Facility(null, "Meeting Room Alpha", "Meeting Room", 12, "Admin Block, 2nd Floor", Arrays.asList("08:00-20:00"), "ACTIVE", "Small meeting room for group discussions and presentations.", "https://images.unsplash.com/photo-1431540015161-0bf868a2d407");
            Facility equip1 = new Facility(null, "Portable Projector Sony-X", "Equipment", 1, "IT Department Store", Arrays.asList("24/7 Availability"), "ACTIVE", "Standard HD portable projector for classroom use.", "https://images.unsplash.com/photo-1533134486753-c833f0ed4866");
            Facility lab2 = new Facility(null, "Chemistry Lab B", "Lab", 40, "Science Block, 3rd Floor", Arrays.asList("08:00-16:00"), "OUT_OF_SERVICE", "General purpose chemistry lab currently under maintenance.", "https://images.unsplash.com/photo-1576086213369-97a306d36557");

            facilityRepository.saveAll(Arrays.asList(hall1, lab1, room1, equip1, lab2));
            System.out.println(">>> Sample Facilities Seeded to MongoDB <<<");
        }
    }
}
