package com.example.rscarpoint.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "vehicles")
public class Vehicle {
    @Id
    private String id;
    private String make;
    private String model;
    private int year;
    private double price;
    private int mileage;
    private String fuelType;
    private String transmission;
    private String engineCapacity;
    private String manufactureDate;
    private String description;
    private String status; // Available, Sold, Reserved
    private String imageBase64; // Base64-encoded image string
} 