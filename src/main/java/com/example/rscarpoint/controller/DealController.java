package com.example.rscarpoint.controller;

import java.time.LocalDate;
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

import com.example.rscarpoint.model.Deal;
import com.example.rscarpoint.repository.DealRepository;

@RestController
@CrossOrigin(origins = {"http://localhost:3003", "http://localhost:3004"}, allowCredentials = "true")
@RequestMapping("/api/deals")
public class DealController {
    @Autowired
    private DealRepository dealRepository;

    // Get all deals or deals by broker
    @GetMapping
    public ResponseEntity<List<Deal>> getDeals(@RequestParam(required = false) String brokerId) {
        try {
            List<Deal> deals;
            if (brokerId != null) {
                deals = dealRepository.findByBrokerId(brokerId);
            } else {
                deals = dealRepository.findAll();
            }
            return ResponseEntity.ok(deals);
        } catch (Exception e) {
            System.err.println("Error fetching deals: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Get deal by ID
    @GetMapping("/{id}")
    public ResponseEntity<Deal> getDealById(@PathVariable String id) {
        try {
            Optional<Deal> deal = dealRepository.findById(id);
            return deal.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            System.err.println("Error fetching deal by ID: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Create new deal
    @PostMapping
    public ResponseEntity<Deal> createDeal(@RequestBody Deal deal) {
        try {
            // Validate required fields
            if (deal.getVehicleId() == null || deal.getBrokerId() == null || deal.getSalePrice() <= 0) {
                return ResponseEntity.badRequest().body(null);
            }

            // Calculate commission (20% of salePrice)
            deal.setCommission(deal.getSalePrice() * 0.2);
            deal.setStatus(deal.getStatus() != null ? deal.getStatus() : "pending");
            deal.setDate(deal.getDate() != null ? deal.getDate() : LocalDate.now().toString());
            
            Deal savedDeal = dealRepository.save(deal);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedDeal);
        } catch (Exception e) {
            System.err.println("Error creating deal: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Update existing deal
    @PutMapping("/{id}")
    public ResponseEntity<Deal> updateDeal(@PathVariable String id, @RequestBody Deal dealDetails) {
        try {
            Optional<Deal> dealOptional = dealRepository.findById(id);
            
            if (dealOptional.isPresent()) {
                Deal deal = dealOptional.get();
                
                // Update fields
                if (dealDetails.getVehicleId() != null) {
                    deal.setVehicleId(dealDetails.getVehicleId());
                }
                if (dealDetails.getBrokerId() != null) {
                    deal.setBrokerId(dealDetails.getBrokerId());
                }
                if (dealDetails.getSalePrice() > 0) {
                    deal.setSalePrice(dealDetails.getSalePrice());
                    // Recalculate commission when sale price changes
                    deal.setCommission(dealDetails.getSalePrice() * 0.2);
                }
                if (dealDetails.getStatus() != null) {
                    deal.setStatus(dealDetails.getStatus());
                }
                if (dealDetails.getDate() != null) {
                    deal.setDate(dealDetails.getDate());
                }
                
                Deal updatedDeal = dealRepository.save(deal);
                return ResponseEntity.ok(updatedDeal);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            System.err.println("Error updating deal: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Delete deal
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDeal(@PathVariable String id) {
        try {
            if (dealRepository.existsById(id)) {
                dealRepository.deleteById(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            System.err.println("Error deleting deal: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    // Get deals by vehicle ID
    @GetMapping("/vehicle/{vehicleId}")
    public ResponseEntity<List<Deal>> getDealsByVehicleId(@PathVariable String vehicleId) {
        try {
            List<Deal> deals = dealRepository.findByVehicleId(vehicleId);
            return ResponseEntity.ok(deals);
        } catch (Exception e) {
            System.err.println("Error fetching deals by vehicle ID: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Update deal status (for admin approval workflow)
    @PutMapping("/{id}/status")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Deal> updateDealStatus(@PathVariable String id, @RequestParam String status) {
        try {
            Optional<Deal> dealOptional = dealRepository.findById(id);
            
            if (dealOptional.isPresent()) {
                Deal deal = dealOptional.get();
                
                // Validate status
                if (!status.matches("pending|approved|completed|rejected")) {
                    return ResponseEntity.badRequest().body(null);
                }
                
                deal.setStatus(status);
                Deal updatedDeal = dealRepository.save(deal);
                return ResponseEntity.ok(updatedDeal);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            System.err.println("Error updating deal status: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
} 