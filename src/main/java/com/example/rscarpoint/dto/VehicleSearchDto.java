package com.example.rscarpoint.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class VehicleSearchDto {
    private String make;
    private String model;
    private String fuelType;
    private String transmission;
    private Double minPrice;
    private Double maxPrice;
    private Integer minYear;
    private Integer maxYear;
    private Integer minMileage;
    private Integer maxMileage;
    private String status;
}
