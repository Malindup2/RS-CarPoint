package com.example.rscarpoint.controller;

import com.example.rscarpoint.model.User;
import com.example.rscarpoint.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register-broker")
    public ResponseEntity<User> registerBroker(@RequestBody User user) {
        if (userRepository.findAll().stream().anyMatch(u -> u.getEmail().equalsIgnoreCase(user.getEmail()))) {
            return ResponseEntity.badRequest().build(); // Email already exists
        }
        user.setRole("broker");
        user.setStatus("active");
        return ResponseEntity.ok(userRepository.save(user));
    }
} 