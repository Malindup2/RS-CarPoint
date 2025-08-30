package com.example.rscarpoint.service;

import com.example.rscarpoint.model.Deal;
import com.example.rscarpoint.model.Vehicle;
import com.example.rscarpoint.model.User;
import com.example.rscarpoint.repository.DealRepository;
import com.example.rscarpoint.repository.VehicleRepository;
import com.example.rscarpoint.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class DealService {
    
    @Autowired
    private DealRepository dealRepository;
    
    @Autowired
    private VehicleRepository vehicleRepository;
    
    @Autowired
    private UserRepository userRepository;
    
    private static final double COMMISSION_RATE = 0.20; // 20% commission
    
    public List<Deal> getAllDeals() {
        return dealRepository.findAll();
    }
    
    public Optional<Deal> getDealById(String id) {
        return dealRepository.findById(id);
    }
    
    public List<Deal> getDealsByBroker(String brokerId) {
        return dealRepository.findByBrokerId(brokerId);
    }
    
    public List<Deal> getDealsByVehicle(String vehicleId) {
        return dealRepository.findByVehicleId(vehicleId);
    }
    
    public List<Deal> getDealsByStatus(String status) {
        return dealRepository.findByStatus(status);
    }
    
    public Deal createDeal(Deal deal) {
        // Validate that vehicle and broker exist
        if (!vehicleRepository.existsById(deal.getVehicleId())) {
            throw new IllegalArgumentException("Vehicle not found");
        }
        
        Optional<User> broker = userRepository.findById(deal.getBrokerId());
        if (broker.isEmpty() || !"broker".equalsIgnoreCase(broker.get().getRole())) {
            throw new IllegalArgumentException("Invalid broker");
        }
        
        // Calculate commission
        deal.setCommission(deal.getSalePrice() * COMMISSION_RATE);
        
        // Set defaults
        if (deal.getStatus() == null || deal.getStatus().trim().isEmpty()) {
            deal.setStatus("pending");
        }
        if (deal.getDate() == null || deal.getDate().trim().isEmpty()) {
            deal.setDate(LocalDate.now().toString());
        }
        
        return dealRepository.save(deal);
    }
    
    public Deal updateDeal(String id, Deal dealDetails) {
        Optional<Deal> dealOpt = dealRepository.findById(id);
        if (dealOpt.isEmpty()) {
            throw new IllegalArgumentException("Deal not found");
        }
        
        Deal existingDeal = dealOpt.get();
        
        // Update fields
        if (dealDetails.getVehicleId() != null) {
            if (!vehicleRepository.existsById(dealDetails.getVehicleId())) {
                throw new IllegalArgumentException("Vehicle not found");
            }
            existingDeal.setVehicleId(dealDetails.getVehicleId());
        }
        
        if (dealDetails.getBrokerId() != null) {
            Optional<User> broker = userRepository.findById(dealDetails.getBrokerId());
            if (broker.isEmpty() || !"broker".equalsIgnoreCase(broker.get().getRole())) {
                throw new IllegalArgumentException("Invalid broker");
            }
            existingDeal.setBrokerId(dealDetails.getBrokerId());
        }
        
        if (dealDetails.getSalePrice() > 0) {
            existingDeal.setSalePrice(dealDetails.getSalePrice());
            // Recalculate commission
            existingDeal.setCommission(dealDetails.getSalePrice() * COMMISSION_RATE);
        }
        
        if (dealDetails.getStatus() != null) {
            existingDeal.setStatus(dealDetails.getStatus());
            
            // If deal is completed, update vehicle status
            if ("completed".equalsIgnoreCase(dealDetails.getStatus())) {
                updateVehicleStatus(existingDeal.getVehicleId(), "Sold");
            }
        }
        
        if (dealDetails.getDate() != null) {
            existingDeal.setDate(dealDetails.getDate());
        }
        
        return dealRepository.save(existingDeal);
    }
    
    public boolean deleteDeal(String id) {
        if (dealRepository.existsById(id)) {
            dealRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public Deal approveDeal(String id) {
        Optional<Deal> dealOpt = dealRepository.findById(id);
        if (dealOpt.isEmpty()) {
            throw new IllegalArgumentException("Deal not found");
        }
        
        Deal deal = dealOpt.get();
        deal.setStatus("approved");
        return dealRepository.save(deal);
    }
    
    public Deal completeDeal(String id) {
        Optional<Deal> dealOpt = dealRepository.findById(id);
        if (dealOpt.isEmpty()) {
            throw new IllegalArgumentException("Deal not found");
        }
        
        Deal deal = dealOpt.get();
        deal.setStatus("completed");
        
        // Update vehicle status to sold
        updateVehicleStatus(deal.getVehicleId(), "Sold");
        
        return dealRepository.save(deal);
    }
    
    public Deal rejectDeal(String id) {
        Optional<Deal> dealOpt = dealRepository.findById(id);
        if (dealOpt.isEmpty()) {
            throw new IllegalArgumentException("Deal not found");
        }
        
        Deal deal = dealOpt.get();
        deal.setStatus("rejected");
        return dealRepository.save(deal);
    }
    
    public List<Deal> getPendingDeals() {
        return dealRepository.findPendingDeals();
    }
    
    public List<Deal> getApprovedDeals() {
        return dealRepository.findApprovedDeals();
    }
    
    public List<Deal> getCompletedDeals() {
        return dealRepository.findCompletedDeals();
    }
    
    public Double getTotalCommissionForBroker(String brokerId) {
        List<Deal> deals = dealRepository.findCommissionByBrokerId(brokerId);
        return deals.stream().mapToDouble(Deal::getCommission).sum();
    }
    
    public List<Deal> getRecentDeals() {
        return dealRepository.findRecentDeals();
    }
    
    public List<Deal> getDealsInPriceRange(Double minPrice, Double maxPrice) {
        return dealRepository.findBySalePriceBetween(minPrice, maxPrice);
    }
    
    public List<Deal> getDealsInDateRange(String startDate, String endDate) {
        return dealRepository.findByDateRange(startDate, endDate);
    }
    
    private void updateVehicleStatus(String vehicleId, String status) {
        Optional<Vehicle> vehicleOpt = vehicleRepository.findById(vehicleId);
        if (vehicleOpt.isPresent()) {
            Vehicle vehicle = vehicleOpt.get();
            vehicle.setStatus(status);
            vehicleRepository.save(vehicle);
        }
    }
}
