package com.example.rscarpoint.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.rscarpoint.model.User;
import com.example.rscarpoint.repository.UserRepository;
import com.example.rscarpoint.security.JwtUtil;

@RestController
@CrossOrigin(origins = {"http://localhost:3001", "http://localhost:3003", "http://localhost:3004"}, allowCredentials = "true")
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register-broker")
    public ResponseEntity<User> registerBroker(@RequestBody User user) {
        if (userRepository.findAll().stream().anyMatch(u -> u.getEmail().equalsIgnoreCase(user.getEmail()))) {
            return ResponseEntity.badRequest().build(); // Email already exists
        }
        user.setRole("broker");
        user.setStatus("active");
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return ResponseEntity.ok(userRepository.save(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginRequest) {
        String email = loginRequest.get("email");
        String password = loginRequest.get("password");
        
        System.out.println("Login attempt for email: " + email);
        
        // Try to find the user manually first to check if it exists
        User existingUser = userRepository.findByEmail(email);
        if (existingUser == null) {
            System.out.println("User not found with findByEmail, trying manual search...");
            existingUser = userRepository.findAll().stream()
                    .filter(u -> email.equalsIgnoreCase(u.getEmail()))
                    .findFirst()
                    .orElse(null);
            
            if (existingUser == null) {
                System.out.println("User doesn't exist in the database: " + email);
                return ResponseEntity.status(401).body("Invalid credentials - User not found");
            } else {
                System.out.println("User found manually: " + existingUser.getEmail());
            }
        } else {
            System.out.println("User found with findByEmail: " + existingUser.getEmail());
        }
        
        try {
            // Now proceed with authentication
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            
            // User has been authenticated successfully
            User user = existingUser;
            
            String token = jwtUtil.generateToken(email, user.getRole());
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("user", user);
            System.out.println("Login successful for: " + email);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            System.out.println("Login error for " + email + ": " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(401).body("Invalid credentials - Authentication failed");
        }
    }
} 