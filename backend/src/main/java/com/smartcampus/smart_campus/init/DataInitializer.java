package com.smartcampus.smart_campus.init;

import com.smartcampus.smart_campus.model.SystemInfo;
import com.smartcampus.smart_campus.repository.SystemInfoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;
import java.time.LocalDateTime;

@Component
public class DataInitializer implements CommandLineRunner {

    private final SystemInfoRepository systemInfoRepository;

    public DataInitializer(SystemInfoRepository systemInfoRepository) {
        this.systemInfoRepository = systemInfoRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (systemInfoRepository.count() == 0) {
            SystemInfo info = new SystemInfo("DATABASE_INITIALIZED", LocalDateTime.now());
            systemInfoRepository.save(info);
            System.out.println(">>> MongoDB Atlas: Database 'smart_campus_db' initialized with sample data.");
        } else {
            System.out.println(">>> MongoDB Atlas: Database already contains data.");
        }
    }
}
