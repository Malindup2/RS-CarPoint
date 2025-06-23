package com.example.rscarpoint.repository;

import com.example.rscarpoint.model.Vehicle;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface VehicleRepository extends MongoRepository<Vehicle, String> {
    // You can add custom query methods here if needed
} 