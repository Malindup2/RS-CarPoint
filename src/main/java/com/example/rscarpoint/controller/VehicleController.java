package com.example.rscarpoint.controller;

import com.example.rscarpoint.model.Vehicle;
import com.example.rscarpoint.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Base64;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/vehicles")
public class VehicleController {
    @Autowired
    private VehicleRepository vehicleRepository;

    @GetMapping
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Vehicle> getVehicleById(@PathVariable String id) {
        Optional<Vehicle> vehicle = vehicleRepository.findById(id);
        return vehicle.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public Vehicle createVehicle(@RequestBody Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vehicle> updateVehicle(@PathVariable String id, @RequestBody Vehicle vehicleDetails) {
        return vehicleRepository.findById(id)
                .map(vehicle -> {
                    vehicle.setMake(vehicleDetails.getMake());
                    vehicle.setModel(vehicleDetails.getModel());
                    vehicle.setYear(vehicleDetails.getYear());
                    vehicle.setPrice(vehicleDetails.getPrice());
                    vehicle.setMileage(vehicleDetails.getMileage());
                    vehicle.setFuelType(vehicleDetails.getFuelType());
                    vehicle.setTransmission(vehicleDetails.getTransmission());
                    vehicle.setEngineCapacity(vehicleDetails.getEngineCapacity());
                    vehicle.setManufactureDate(vehicleDetails.getManufactureDate());
                    vehicle.setDescription(vehicleDetails.getDescription());
                    vehicle.setStatus(vehicleDetails.getStatus());
                    return ResponseEntity.ok(vehicleRepository.save(vehicle));
                })
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable String id) {
        if (vehicleRepository.existsById(id)) {
            vehicleRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}/upload-image")
    public ResponseEntity<Vehicle> uploadImage(@PathVariable String id, @RequestParam("file") MultipartFile file) {
        return vehicleRepository.findById(id)
                .map(vehicle -> {
                    try {
                        String base64 = Base64.getEncoder().encodeToString(file.getBytes());
                        vehicle.setImageBase64(base64);
                        return ResponseEntity.ok(vehicleRepository.save(vehicle));
                    } catch (IOException e) {
                        return ResponseEntity.status(500).body(vehicle);
                    }
                })
                .orElse(ResponseEntity.notFound().build());
    }
} 