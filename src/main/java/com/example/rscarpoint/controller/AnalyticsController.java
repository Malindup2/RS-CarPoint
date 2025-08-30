package com.example.rscarpoint.controller;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.rscarpoint.model.Deal;
import com.example.rscarpoint.model.Vehicle;
import com.example.rscarpoint.repository.DealRepository;
import com.example.rscarpoint.repository.VehicleRepository;

@RestController
@CrossOrigin(origins = {"http://localhost:3003", "http://localhost:3004"}, allowCredentials = "true")
@RequestMapping("/api/analytics")
public class AnalyticsController {
    
    @Autowired
    private DealRepository dealRepository;
    
    @Autowired
    private VehicleRepository vehicleRepository;

    @GetMapping("/sales")
    public Map<String, Object> getSalesData(@RequestParam(defaultValue = "1year") String timeRange) {
        List<Deal> deals = dealRepository.findAll();
        Map<String, Object> response = new HashMap<>();
        
        // Generate mock monthly sales data
        List<Map<String, Object>> monthlyData = new ArrayList<>();
        String[] months = {"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"};
        
        for (int i = 0; i < 12; i++) {
            Map<String, Object> monthData = new HashMap<>();
            monthData.put("month", months[i]);
            monthData.put("sales", (int)(Math.random() * 50) + 10); // Random sales between 10-60
            monthData.put("revenue", (int)(Math.random() * 5000000) + 1000000); // Random revenue
            monthlyData.add(monthData);
        }
        
        response.put("monthlyData", monthlyData);
        response.put("totalSales", deals.size());
        response.put("totalRevenue", deals.stream().mapToDouble(Deal::getSalePrice).sum());
        
        return response;
    }

    @GetMapping("/vehicle-types")
    public Map<String, Object> getVehicleTypeSales(@RequestParam(defaultValue = "1year") String timeRange) {
        List<Vehicle> vehicles = vehicleRepository.findAll();
        Map<String, Integer> typeCounts = new HashMap<>();
        
        // Count vehicles by type (using make as type)
        for (Vehicle vehicle : vehicles) {
            String make = vehicle.getMake();
            typeCounts.put(make, typeCounts.getOrDefault(make, 0) + 1);
        }
        
        List<Map<String, Object>> typeData = new ArrayList<>();
        for (Map.Entry<String, Integer> entry : typeCounts.entrySet()) {
            Map<String, Object> type = new HashMap<>();
            type.put("type", entry.getKey());
            type.put("count", entry.getValue());
            type.put("percentage", vehicles.isEmpty() ? 0 : (entry.getValue() * 100.0 / vehicles.size()));
            typeData.add(type);
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("data", typeData);
        return response;
    }

    @GetMapping("/dealer-performance")
    public Map<String, Object> getDealerPerformance(@RequestParam(defaultValue = "1year") String timeRange) {
        List<Deal> deals = dealRepository.findAll();
        Map<String, Double> brokerPerformance = new HashMap<>();
        
        // Calculate performance by broker
        for (Deal deal : deals) {
            String brokerId = deal.getBrokerId();
            brokerPerformance.put(brokerId, brokerPerformance.getOrDefault(brokerId, 0.0) + deal.getSalePrice());
        }
        
        List<Map<String, Object>> performanceData = new ArrayList<>();
        for (Map.Entry<String, Double> entry : brokerPerformance.entrySet()) {
            Map<String, Object> broker = new HashMap<>();
            broker.put("brokerId", entry.getKey());
            broker.put("brokerName", "Broker " + entry.getKey().substring(0, Math.min(8, entry.getKey().length())));
            broker.put("totalSales", entry.getValue());
            broker.put("dealCount", deals.stream().mapToInt(d -> d.getBrokerId().equals(entry.getKey()) ? 1 : 0).sum());
            performanceData.add(broker);
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("data", performanceData);
        return response;
    }

    @GetMapping("/revenue")
    public Map<String, Object> getRevenueMetrics(@RequestParam(defaultValue = "1year") String timeRange) {
        List<Deal> deals = dealRepository.findAll();
        
        double totalRevenue = deals.stream().mapToDouble(Deal::getSalePrice).sum();
        double totalCommission = deals.stream().mapToDouble(Deal::getCommission).sum();
        double averageDealValue = deals.isEmpty() ? 0 : totalRevenue / deals.size();
        
        Map<String, Object> response = new HashMap<>();
        response.put("totalRevenue", totalRevenue);
        response.put("totalCommission", totalCommission);
        response.put("averageDealValue", averageDealValue);
        response.put("dealCount", deals.size());
        response.put("growthRate", 12.5); // Mock growth rate
        
        return response;
    }

    @GetMapping("/report")
    public Map<String, Object> getSalesReport(@RequestParam(defaultValue = "1year") String timeRange) {
        List<Deal> deals = dealRepository.findAll();
        List<Vehicle> vehicles = vehicleRepository.findAll();
        
        Map<String, Object> report = new HashMap<>();
        report.put("period", timeRange);
        report.put("generatedAt", LocalDateTime.now().format(DateTimeFormatter.ISO_LOCAL_DATE_TIME));
        report.put("totalDeals", deals.size());
        report.put("totalVehicles", vehicles.size());
        report.put("totalRevenue", deals.stream().mapToDouble(Deal::getSalePrice).sum());
        report.put("averageDealValue", deals.isEmpty() ? 0 : deals.stream().mapToDouble(Deal::getSalePrice).average().orElse(0));
        
        // Top performing months (mock data)
        List<Map<String, Object>> topMonths = new ArrayList<>();
        String[] months = {"January", "March", "June"};
        double[] revenues = {2500000, 2200000, 2100000};
        
        for (int i = 0; i < 3; i++) {
            Map<String, Object> month = new HashMap<>();
            month.put("month", months[i]);
            month.put("revenue", revenues[i]);
            topMonths.add(month);
        }
        
        report.put("topPerformingMonths", topMonths);
        
        return report;
    }
}
