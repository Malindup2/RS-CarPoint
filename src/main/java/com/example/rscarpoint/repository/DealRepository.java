package com.example.rscarpoint.repository;

import com.example.rscarpoint.model.Deal;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface DealRepository extends MongoRepository<Deal, String> {
    List<Deal> findByBrokerId(String brokerId);
    List<Deal> findByVehicleId(String vehicleId);
} 