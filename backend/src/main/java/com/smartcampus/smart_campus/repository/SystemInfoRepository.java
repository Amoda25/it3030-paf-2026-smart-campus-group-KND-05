package com.smartcampus.smart_campus.repository;

import com.smartcampus.smart_campus.model.SystemInfo;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SystemInfoRepository extends MongoRepository<SystemInfo, String> {
}
