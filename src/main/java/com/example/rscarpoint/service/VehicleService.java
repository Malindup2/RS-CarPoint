package com.example.rscarpoint.service;

import com.example.rscarpoint.dto.VehicleSearchDto;
import com.example.rscarpoint.model.Vehicle;
import com.example.rscarpoint.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class VehicleService {
    
    @Autowired
    private VehicleRepository vehicleRepository;
    
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }
    
    public Optional<Vehicle> getVehicleById(String id) {
        return vehicleRepository.findById(id);
    }
    
    public Vehicle saveVehicle(Vehicle vehicle) {
        // Set defaults if not provided
        if (vehicle.getStatus() == null || vehicle.getStatus().trim().isEmpty()) {
            vehicle.setStatus("Available");
        }
        return vehicleRepository.save(vehicle);
    }
    
    public boolean deleteVehicle(String id) {
        if (vehicleRepository.existsById(id)) {
            vehicleRepository.deleteById(id);
            return true;
        }
        return false;
    }
    
    public List<Vehicle> searchVehicles(VehicleSearchDto searchDto) {
        List<Vehicle> vehicles = vehicleRepository.findAll();
        
        return vehicles.stream()
            .filter(vehicle -> searchDto.getMake() == null || 
                vehicle.getMake().toLowerCase().contains(searchDto.getMake().toLowerCase()))
            .filter(vehicle -> searchDto.getModel() == null || 
                vehicle.getModel().toLowerCase().contains(searchDto.getModel().toLowerCase()))
            .filter(vehicle -> searchDto.getFuelType() == null || 
                vehicle.getFuelType().toLowerCase().contains(searchDto.getFuelType().toLowerCase()))
            .filter(vehicle -> searchDto.getTransmission() == null || 
                vehicle.getTransmission().toLowerCase().contains(searchDto.getTransmission().toLowerCase()))
            .filter(vehicle -> searchDto.getMinPrice() == null || 
                vehicle.getPrice() >= searchDto.getMinPrice())
            .filter(vehicle -> searchDto.getMaxPrice() == null || 
                vehicle.getPrice() <= searchDto.getMaxPrice())
            .filter(vehicle -> searchDto.getMinYear() == null || 
                vehicle.getYear() >= searchDto.getMinYear())
            .filter(vehicle -> searchDto.getMaxYear() == null || 
                vehicle.getYear() <= searchDto.getMaxYear())
            .filter(vehicle -> searchDto.getMinMileage() == null || 
                vehicle.getMileage() >= searchDto.getMinMileage())
            .filter(vehicle -> searchDto.getMaxMileage() == null || 
                vehicle.getMileage() <= searchDto.getMaxMileage())
            .filter(vehicle -> searchDto.getStatus() == null || 
                vehicle.getStatus().equalsIgnoreCase(searchDto.getStatus()))
            .collect(Collectors.toList());
    }
    
    public List<Vehicle> getAvailableVehicles() {
        return vehicleRepository.findAvailableVehicles();
    }
    
    public List<Vehicle> getVehiclesByMake(String make) {
        return vehicleRepository.findByMakeIgnoreCase(make);
    }
    
    public List<Vehicle> getVehiclesByModel(String model) {
        return vehicleRepository.findByModelIgnoreCase(model);
    }
    
    public List<Vehicle> getVehiclesInPriceRange(Double minPrice, Double maxPrice) {
        return vehicleRepository.findByPriceBetween(minPrice, maxPrice);
    }
    
    public List<Vehicle> searchVehiclesByText(String searchText) {
        return vehicleRepository.searchByMakeOrModel(searchText);
    }
    
    public boolean updateVehicleStatus(String id, String status) {
        Optional<Vehicle> vehicleOpt = vehicleRepository.findById(id);
        if (vehicleOpt.isPresent()) {
            Vehicle vehicle = vehicleOpt.get();
            vehicle.setStatus(status);
            vehicleRepository.save(vehicle);
            return true;
        }
        return false;
    }
}
