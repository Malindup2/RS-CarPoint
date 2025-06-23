package com.example.rscarpoint.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "deals")
public class Deal {
    @Id
    private String id;
    private String vehicleId;
    private String brokerId;
    private double salePrice;
    private double commission; // 20% of salePrice
    private String date;
    private String status; // pending, completed, approved
} 