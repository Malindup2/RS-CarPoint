package com.example.rscarpoint.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

@SpringBootTest
@AutoConfigureMockMvc
public class VehicleControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    public void testGetAllVehicles() throws Exception {
        mockMvc.perform(get("/api/vehicles"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").exists());
    }

    @Test
    public void testGetVehicleById() throws Exception {
        String vehicleId = "1"; // Valid ID from seeded database
        mockMvc.perform(get("/api/vehicles/" + vehicleId))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(vehicleId));
    }

    @Test
    public void testCreateVehicle() throws Exception {
        String newVehicle = "{" +
                "\"make\": \"Toyota\", " +
                "\"model\": \"Corolla\", " +
                "\"year\": 2023, " +
                "\"price\": 20000 " +
                "}";

        mockMvc.perform(post("/api/vehicles")
                .contentType(MediaType.APPLICATION_JSON)
                .content(newVehicle))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.make").value("Toyota"));
    }

    @Test
    public void testUpdateVehicle() throws Exception {
        String vehicleId = "2"; // Valid ID from seeded database
        String updatedVehicle = "{" +
                "\"make\": \"Honda\", " +
                "\"model\": \"Civic\", " +
                "\"year\": 2022, " +
                "\"price\": 18000 " +
                "}";

        mockMvc.perform(put("/api/vehicles/" + vehicleId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(updatedVehicle))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.make").value("Honda"));
    }

    @Test
    public void testDeleteVehicle() throws Exception {
        String vehicleId = "3"; // Valid ID from seeded database

        mockMvc.perform(delete("/api/vehicles/" + vehicleId))
                .andExpect(status().isNoContent());
    }
}
