package com.example.rscarpoint.repository;

import com.example.rscarpoint.model.Vehicle;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import java.util.List;

public interface VehicleRepository extends MongoRepository<Vehicle, String> {
    // Find vehicles by make
    List<Vehicle> findByMakeIgnoreCase(String make);
    
    // Find vehicles by model
    List<Vehicle> findByModelIgnoreCase(String model);
    
    // Find vehicles by fuel type
    List<Vehicle> findByFuelTypeIgnoreCase(String fuelType);
    
    // Find vehicles by status
    List<Vehicle> findByStatus(String status);
    
    // Find vehicles within price range
    List<Vehicle> findByPriceBetween(Double minPrice, Double maxPrice);
    
    // Find vehicles within year range
    List<Vehicle> findByYearBetween(Integer minYear, Integer maxYear);
    
    // Find vehicles by make and model
    List<Vehicle> findByMakeIgnoreCaseAndModelIgnoreCase(String make, String model);
    
    // Custom query to find available vehicles
    @Query("{'status': 'Available'}")
    List<Vehicle> findAvailableVehicles();
    
    // Custom query to search vehicles by text in make or model
    @Query("{'$or': [{'make': {'$regex': ?0, '$options': 'i'}}, {'model': {'$regex': ?0, '$options': 'i'}}]}")
    List<Vehicle> searchByMakeOrModel(String searchText);
} 