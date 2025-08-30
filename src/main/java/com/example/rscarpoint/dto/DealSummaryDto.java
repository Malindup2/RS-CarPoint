package com.example.rscarpoint.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DealSummaryDto {
    private String id;
    private String vehicleId;
    private String vehicleMake;
    private String vehicleModel;
    private String brokerId;
    private String brokerName;
    private double salePrice;
    private double commission;
    private String date;
    private String status;
}
