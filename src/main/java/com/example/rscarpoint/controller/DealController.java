package com.example.rscarpoint.controller;

import com.example.rscarpoint.model.Deal;
import com.example.rscarpoint.repository.DealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.security.Principal;
import java.util.List;

@RestController
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