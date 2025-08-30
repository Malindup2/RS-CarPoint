package com.example.rscarpoint.repository;

import com.example.rscarpoint.model.Deal;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import java.util.List;

public interface DealRepository extends MongoRepository<Deal, String> {
    // Find deals by broker ID
    List<Deal> findByBrokerId(String brokerId);
    
    // Find deals by vehicle ID
    List<Deal> findByVehicleId(String vehicleId);
    
    // Find deals by status
    List<Deal> findByStatus(String status);
    
    // Find deals within price range
    List<Deal> findBySalePriceBetween(Double minPrice, Double maxPrice);
    
    // Find deals by date range (assuming date is stored as String in format YYYY-MM-DD)
    @Query("{'date': {'$gte': ?0, '$lte': ?1}}")
    List<Deal> findByDateRange(String startDate, String endDate);
    
    // Find pending deals
    @Query("{'status': 'pending'}")
    List<Deal> findPendingDeals();
    
    // Find approved deals
    @Query("{'status': 'approved'}")
    List<Deal> findApprovedDeals();
    
    // Find completed deals
    @Query("{'status': 'completed'}")
    List<Deal> findCompletedDeals();
    
    // Calculate total commission for a broker
    @Query(value = "{'brokerId': ?0}", fields = "{'commission': 1}")
    List<Deal> findCommissionByBrokerId(String brokerId);
    
    // Get deals ordered by sale price (highest first)
    List<Deal> findAllByOrderBySalePriceDesc();
    
    // Get recent deals (ordered by date descending)
    @Query(value = "{}", sort = "{'date': -1}")
    List<Deal> findRecentDeals();
} 