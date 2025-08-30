package com.example.rscarpoint.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.rscarpoint.model.User;
import com.example.rscarpoint.repository.UserRepository;

@RestController
@CrossOrigin(origins = {"http://localhost:3003", "http://localhost:3004"}, allowCredentials = "true")
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        try {
            List<User> users = userRepository.findAll();
            // Remove password from response for security
            users.forEach(user -> user.setPassword(null));
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            System.err.println("Error fetching users: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        try {
            Optional<User> user = userRepository.findById(id);
            if (user.isPresent()) {
                User foundUser = user.get();
                foundUser.setPassword(null); // Remove password from response
                return ResponseEntity.ok(foundUser);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            System.err.println("Error fetching user by ID: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> createUser(@RequestBody User user) {
        try {
            // Validate required fields
            if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
                return ResponseEntity.badRequest().body(null);
            }
            
            // Check if user already exists
            Optional<User> existingUser = userRepository.findByEmail(user.getEmail());
            if (existingUser.isPresent()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
            }
            
            // Encrypt password if provided
            if (user.getPassword() != null && !user.getPassword().trim().isEmpty()) {
                user.setPassword(passwordEncoder.encode(user.getPassword()));
            }
            
            // Set defaults
            if (user.getRole() == null) {
                user.setRole("broker");
            }
            if (user.getStatus() == null) {
                user.setStatus("active");
            }
            
            User savedUser = userRepository.save(user);
            savedUser.setPassword(null); // Remove password from response
            return ResponseEntity.status(HttpStatus.CREATED).body(savedUser);
        } catch (Exception e) {
            System.err.println("Error creating user: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<User> updateUser(@PathVariable String id, @RequestBody User userDetails) {
        try {
            Optional<User> userOptional = userRepository.findById(id);
            
            if (userOptional.isPresent()) {
                User user = userOptional.get();
                
                // Update fields if provided
                if (userDetails.getName() != null) {
                    user.setName(userDetails.getName());
                }
                if (userDetails.getEmail() != null) {
                    // Check if email is already taken by another user
                    Optional<User> existingUser = userRepository.findByEmail(userDetails.getEmail());
                    if (existingUser.isPresent() && !existingUser.get().getId().equals(id)) {
                        return ResponseEntity.status(HttpStatus.CONFLICT).body(null);
                    }
                    user.setEmail(userDetails.getEmail());
                }
                if (userDetails.getRole() != null) {
                    user.setRole(userDetails.getRole());
                }
                if (userDetails.getStatus() != null) {
                    user.setStatus(userDetails.getStatus());
                }
                if (userDetails.getJoinDate() != null) {
                    user.setJoinDate(userDetails.getJoinDate());
                }
                if (userDetails.getLastLogin() != null) {
                    user.setLastLogin(userDetails.getLastLogin());
                }
                // Only update password if a new one is provided
                if (userDetails.getPassword() != null && !userDetails.getPassword().trim().isEmpty()) {
                    user.setPassword(passwordEncoder.encode(userDetails.getPassword()));
                }
                
                User updatedUser = userRepository.save(user);
                updatedUser.setPassword(null); // Remove password from response
                return ResponseEntity.ok(updatedUser);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            System.err.println("Error updating user: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        try {
            if (userRepository.existsById(id)) {
                // Prevent deletion of admin users (optional safety measure)
                Optional<User> user = userRepository.findById(id);
                if (user.isPresent() && "admin".equals(user.get().getRole())) {
                    return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
                }
                
                userRepository.deleteById(id);
                return ResponseEntity.noContent().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            System.err.println("Error deleting user: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
} 