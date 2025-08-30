package com.example.rscarpoint.config;

import com.example.rscarpoint.model.Vehicle;
import com.example.rscarpoint.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DatabaseSeeder implements CommandLineRunner {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Override
    public void run(String... args) throws Exception {
        // Clear existing data
        vehicleRepository.deleteAll();

        // Seed database with sample vehicles
        Vehicle v1 = new Vehicle();
        v1.setMake("Toyota");
        v1.setModel("Corolla");
        v1.setYear(2023);
        v1.setPrice(2000000.0);
        v1.setMileage(0);
        v1.setFuelType("Petrol");
        v1.setTransmission("Automatic");
        v1.setEngineCapacity("1.8L");
        v1.setManufactureDate("2023-01-01");
        v1.setDescription("Reliable sedan");
        v1.setStatus("Available");
        vehicleRepository.save(v1);

        Vehicle v2 = new Vehicle();
        v2.setMake("Honda");
        v2.setModel("Civic");
        v2.setYear(2022);
        v2.setPrice(1800000.0);
        v2.setMileage(0);
        v2.setFuelType("Petrol");
        v2.setTransmission("Automatic");
        v2.setEngineCapacity("1.5L");
        v2.setManufactureDate("2022-01-01");
        v2.setDescription("Compact car");
        v2.setStatus("Available");
        vehicleRepository.save(v2);

        Vehicle v3 = new Vehicle();
        v3.setMake("Ford");
        v3.setModel("Focus");
        v3.setYear(2021);
        v3.setPrice(1500000.0);
        v3.setMileage(0);
        v3.setFuelType("Diesel");
        v3.setTransmission("Manual");
        v3.setEngineCapacity("2.0L");
        v3.setManufactureDate("2021-01-01");
        v3.setDescription("Affordable hatchback");
        v3.setStatus("Available");
        vehicleRepository.save(v3);

        System.out.println("Database seeded with sample vehicles.");
    }
}
