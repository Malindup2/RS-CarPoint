package com.example.rscarpoint.controller;

import com.example.rscarpoint.model.Vehicle;
import com.example.rscarpoint.model.Deal;
import com.example.rscarpoint.repository.VehicleRepository;
import com.example.rscarpoint.repository.DealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin(origins = {"http://localhost:3003", "http://localhost:3004"}, allowCredentials = "true")
@RequestMapping("/api/data")
public class DataController {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private DealRepository dealRepository;

    @PostMapping("/seed-vehicles")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> seedVehicles() {
        try {
            List<Vehicle> vehicles = createSampleVehicles();
            List<Vehicle> savedVehicles = vehicleRepository.saveAll(vehicles);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Sample vehicles created successfully",
                "count", savedVehicles.size()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Failed to seed vehicles: " + e.getMessage()
            ));
        }
    }

    @PostMapping("/seed-deals")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> seedDeals() {
        try {
            List<Vehicle> vehicles = vehicleRepository.findAll();
            if (vehicles.isEmpty()) {
                return ResponseEntity.badRequest().body(Map.of(
                    "success", false,
                    "message", "Please seed vehicles first"
                ));
            }

            List<Deal> deals = createSampleDeals(vehicles);
            List<Deal> savedDeals = dealRepository.saveAll(deals);
            
            return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Sample deals created successfully",
                "count", savedDeals.size()
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", false,
                "message", "Failed to seed deals: " + e.getMessage()
            ));
        }
    }

    @DeleteMapping("/clear-vehicles")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> clearVehicles() {
        try {
            vehicleRepository.deleteAll();
            return ResponseEntity.ok(Map.of(
                "success", "true",
                "message", "All vehicles deleted successfully"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", "false",
                "message", "Failed to clear vehicles: " + e.getMessage()
            ));
        }
    }

    @DeleteMapping("/clear-deals")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, String>> clearDeals() {
        try {
            dealRepository.deleteAll();
            return ResponseEntity.ok(Map.of(
                "success", "true",
                "message", "All deals deleted successfully"
            ));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of(
                "success", "false",
                "message", "Failed to clear deals: " + e.getMessage()
            ));
        }
    }

    private List<Vehicle> createSampleVehicles() {
        List<Vehicle> vehicles = new ArrayList<>();
        
        Vehicle v1 = new Vehicle();
        v1.setMake("Toyota");
        v1.setModel("Aqua");
        v1.setYear(2018);
        v1.setPrice(4250000.0);
        v1.setMileage(45000);
        v1.setFuelType("Hybrid");
        v1.setTransmission("Auto");
        v1.setEngineCapacity("1500cc");
        v1.setDescription("Well maintained Toyota Aqua hybrid vehicle");
        v1.setStatus("Available");
        vehicles.add(v1);
        
        Vehicle v2 = new Vehicle();
        v2.setMake("Honda");
        v2.setModel("Vezel");
        v2.setYear(2020);
        v2.setPrice(6500000.0);
        v2.setMileage(25000);
        v2.setFuelType("Hybrid");
        v2.setTransmission("Auto");
        v2.setEngineCapacity("1500cc");
        v2.setDescription("Premium Honda Vezel with low mileage");
        v2.setStatus("Available");
        vehicles.add(v2);
        
        Vehicle v3 = new Vehicle();
        v3.setMake("Suzuki");
        v3.setModel("Wagon R");
        v3.setYear(2017);
        v3.setPrice(2850000.0);
        v3.setMileage(52000);
        v3.setFuelType("Petrol");
        v3.setTransmission("Auto");
        v3.setEngineCapacity("1000cc");
        v3.setDescription("Reliable family car with good fuel economy");
        v3.setStatus("Available");
        vehicles.add(v3);
        
        Vehicle v4 = new Vehicle();
        v4.setMake("Nissan");
        v4.setModel("Leaf");
        v4.setYear(2019);
        v4.setPrice(3800000.0);
        v4.setMileage(28000);
        v4.setFuelType("Electric");
        v4.setTransmission("Auto");
        v4.setEngineCapacity("Electric");
        v4.setDescription("Eco-friendly electric vehicle");
        v4.setStatus("Available");
        vehicles.add(v4);
        
        Vehicle v5 = new Vehicle();
        v5.setMake("BMW");
        v5.setModel("X1");
        v5.setYear(2021);
        v5.setPrice(8500000.0);
        v5.setMileage(15000);
        v5.setFuelType("Petrol");
        v5.setTransmission("Auto");
        v5.setEngineCapacity("2000cc");
        v5.setDescription("Luxury SUV with premium features");
        v5.setStatus("Available");
        vehicles.add(v5);
        
        return vehicles;
    }

    private List<Deal> createSampleDeals(List<Vehicle> vehicles) {
        List<Deal> deals = new ArrayList<>();
        
        // Create some sample deals with available vehicles
        for (int i = 0; i < Math.min(3, vehicles.size()); i++) {
            Vehicle vehicle = vehicles.get(i);
            
            Deal deal = new Deal();
            deal.setVehicleId(vehicle.getId());
            deal.setBrokerId("broker123"); // Sample broker ID
            deal.setSalePrice(vehicle.getPrice() * 0.95); // 5% discount
            deal.setCommission(deal.getSalePrice() * 0.2);
            deal.setDate(LocalDate.now().minusDays(i * 5).toString());
            deal.setStatus(i == 0 ? "completed" : (i == 1 ? "approved" : "pending"));
            
            deals.add(deal);
        }
        
        return deals;
    }
}
