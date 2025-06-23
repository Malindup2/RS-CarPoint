package com.example.rscarpoint.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
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

    // For simplicity, role check is omitted; in production, use @PreAuthorize or similar
    @GetMapping
    public List<Deal> getDeals(@RequestParam(required = false) String brokerId) {
        if (brokerId != null) {
            return dealRepository.findByBrokerId(brokerId);
        } else {
            return dealRepository.findAll();
        }
    }

    @PostMapping
    public ResponseEntity<Deal> createDeal(@RequestBody Deal deal) {
        // Calculate commission (20% of salePrice)
        deal.setCommission(deal.getSalePrice() * 0.2);
        deal.setStatus("pending");
        return ResponseEntity.ok(dealRepository.save(deal));
    }
} 