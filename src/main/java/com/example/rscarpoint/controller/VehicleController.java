package com.example.rscarpoint.controller;

import java.io.IOException;
import java.util.Base64;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.rscarpoint.model.Vehicle;
import com.example.rscarpoint.repository.VehicleRepository;

@RestController
@CrossOrigin(origins = {"http://localhost:3003", "http://localhost:3004"}, allowCredentials = "true")
@RequestMapping("/api/vehicles")
public class VehicleController {
    @Autowired
    private VehicleRepository vehicleRepository;

    // Public endpoint - anyone can view vehicles
    @GetMapping
    public ResponseEntity<List<Vehicle>> getAllVehicles() {
        try {
            List<Vehicle> vehicles = vehicleRepository.findAll();
            return ResponseEntity.ok(vehicles);
        } catch (Exception e) {
            System.err.println("Error fetching vehicles: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Public endpoint - anyone can view a specific vehicle
    @GetMapping("/{id}")
    public ResponseEntity<Vehicle> getVehicleById(@PathVariable String id) {
        try {
            Optional<Vehicle> vehicle = vehicleRepository.findById(id);
            return vehicle.map(ResponseEntity::ok)
                         .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            System.err.println("Error fetching vehicle by ID: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Only admin can create vehicles
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Vehicle> createVehicle(@RequestBody Vehicle vehicle) {
        try {
            // Validate required fields
            if (vehicle.getMake() == null || vehicle.getMake().trim().isEmpty() ||
                vehicle.getModel() == null || vehicle.getModel().trim().isEmpty() ||
                vehicle.getYear() <= 1900 || vehicle.getPrice() <= 0) {
                return ResponseEntity.badRequest().body(null);
            }
            
            // Set defaults
            if (vehicle.getStatus() == null) {
                vehicle.setStatus("Available");
            }
            
            Vehicle savedVehicle = vehicleRepository.save(vehicle);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedVehicle);
        } catch (Exception e) {
            System.err.println("Error creating vehicle: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Only admin can update vehicles
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Vehicle> updateVehicle(@PathVariable String id, @RequestBody Vehicle vehicleDetails) {
        try {
            Optional<Vehicle> vehicleOptional = vehicleRepository.findById(id);
            
            if (vehicleOptional.isPresent()) {
                Vehicle vehicle = vehicleOptional.get();
                
                // Update fields if provided
                if (vehicleDetails.getMake() != null && !vehicleDetails.getMake().trim().isEmpty()) {
                    vehicle.setMake(vehicleDetails.getMake());
                }
                if (vehicleDetails.getModel() != null && !vehicleDetails.getModel().trim().isEmpty()) {
                    vehicle.setModel(vehicleDetails.getModel());
                }
                if (vehicleDetails.getYear() > 1900) {
                    vehicle.setYear(vehicleDetails.getYear());
                }
                if (vehicleDetails.getPrice() > 0) {
                    vehicle.setPrice(vehicleDetails.getPrice());
                }
                if (vehicleDetails.getMileage() >= 0) {
                    vehicle.setMileage(vehicleDetails.getMileage());
                }
                if (vehicleDetails.getFuelType() != null) {
                    vehicle.setFuelType(vehicleDetails.getFuelType());
                }
                if (vehicleDetails.getTransmission() != null) {
                    vehicle.setTransmission(vehicleDetails.getTransmission());
                }
                if (vehicleDetails.getEngineCapacity() != null) {
                    vehicle.setEngineCapacity(vehicleDetails.getEngineCapacity());
                }
                if (vehicleDetails.getManufactureDate() != null) {
                    vehicle.setManufactureDate(vehicleDetails.getManufactureDate());
                }
                if (vehicleDetails.getDescription() != null) {
                    vehicle.setDescription(vehicleDetails.getDescription());
                }
                if (vehicleDetails.getStatus() != null) {
                    vehicle.setStatus(vehicleDetails.getStatus());
                }
                if (vehicleDetails.getImageBase64() != null) {
                    vehicle.setImageBase64(vehicleDetails.getImageBase64());
                }
                
                Vehicle updatedVehicle = vehicleRepository.save(vehicle);
                return ResponseEntity.ok(updatedVehicle);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            System.err.println("Error updating vehicle: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Only admin can delete vehicles
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteVehicle(@PathVariable String id) {
        try {
            if (vehicleRepository.existsById(id)) {
                vehicleRepository.deleteById(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            System.err.println("Error deleting vehicle: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Only authenticated users can upload images
    @PostMapping("/{id}/upload-image")
    @PreAuthorize("hasRole('ADMIN') or hasRole('BROKER')")
    public ResponseEntity<Vehicle> uploadImage(@PathVariable String id, @RequestParam("file") MultipartFile file) {
        try {
            // Validate file
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body(null);
            }
            
            // Check file size (max 5MB)
            if (file.getSize() > 5 * 1024 * 1024) {
                return ResponseEntity.status(HttpStatus.PAYLOAD_TOO_LARGE).body(null);
            }
            
            // Check file type
            String contentType = file.getContentType();
            if (contentType == null || (!contentType.startsWith("image/"))) {
                return ResponseEntity.badRequest().body(null);
            }
            
            Optional<Vehicle> vehicleOptional = vehicleRepository.findById(id);
            if (vehicleOptional.isPresent()) {
                Vehicle vehicle = vehicleOptional.get();
                
                try {
                    String base64 = Base64.getEncoder().encodeToString(file.getBytes());
                    vehicle.setImageBase64(base64);
                    Vehicle updatedVehicle = vehicleRepository.save(vehicle);
                    return ResponseEntity.ok(updatedVehicle);
                } catch (IOException e) {
                    System.err.println("Error processing image file: " + e.getMessage());
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
                }
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            System.err.println("Error uploading image: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Search vehicles by make, model, or other criteria
    @GetMapping("/search")
    public ResponseEntity<List<Vehicle>> searchVehicles(
            @RequestParam(required = false) String make,
            @RequestParam(required = false) String model,
            @RequestParam(required = false) String fuelType,
            @RequestParam(required = false) Double minPrice,
            @RequestParam(required = false) Double maxPrice,
            @RequestParam(required = false) Integer minYear,
            @RequestParam(required = false) Integer maxYear) {
        try {
            List<Vehicle> allVehicles = vehicleRepository.findAll();
            List<Vehicle> filteredVehicles = allVehicles.stream()
                .filter(vehicle -> make == null || vehicle.getMake().toLowerCase().contains(make.toLowerCase()))
                .filter(vehicle -> model == null || vehicle.getModel().toLowerCase().contains(model.toLowerCase()))
                .filter(vehicle -> fuelType == null || vehicle.getFuelType().toLowerCase().contains(fuelType.toLowerCase()))
                .filter(vehicle -> minPrice == null || vehicle.getPrice() >= minPrice)
                .filter(vehicle -> maxPrice == null || vehicle.getPrice() <= maxPrice)
                .filter(vehicle -> minYear == null || vehicle.getYear() >= minYear)
                .filter(vehicle -> maxYear == null || vehicle.getYear() <= maxYear)
                .toList();
            
            return ResponseEntity.ok(filteredVehicles);
        } catch (Exception e) {
            System.err.println("Error searching vehicles: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
} 