package com.example.rscarpoint.utility;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.rscarpoint.model.User;
import com.example.rscarpoint.repository.UserRepository;

/**
 * This utility will run when the application starts and check if the admin user exists.
 * If not, it will create a default admin user.
 */
@Component
public class AdminUserInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        // Check if admin user exists
        User adminUser = userRepository.findByEmail("admin@admin.com");
        
        if (adminUser == null) {
            // Admin user doesn't exist, create it
            System.out.println("Admin user doesn't exist. Creating default admin user...");
            
            User newAdmin = new User();
            newAdmin.setName("Admin");
            newAdmin.setEmail("admin@admin.com");
            newAdmin.setRole("admin");
            newAdmin.setStatus("active");
            newAdmin.setJoinDate(LocalDate.now().toString());
            newAdmin.setLastLogin("");
            newAdmin.setPassword(passwordEncoder.encode("admin123"));
            
            userRepository.save(newAdmin);
            
            System.out.println("Default admin user created successfully.");
        } else {
            System.out.println("Admin user already exists: " + adminUser.getEmail());
            
            // Check if the password matches "admin123"
            boolean passwordMatches = passwordEncoder.matches("admin123", adminUser.getPassword());
            System.out.println("Does password match 'admin123'? " + passwordMatches);
            
            if (!passwordMatches) {
                // Update password
                System.out.println("Updating admin password to 'admin123'...");
                adminUser.setPassword(passwordEncoder.encode("admin123"));
                userRepository.save(adminUser);
                System.out.println("Admin password updated successfully.");
            }
        }
    }
}
