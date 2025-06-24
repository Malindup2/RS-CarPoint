package com.example.rscarpoint;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.rscarpoint.model.User;
import com.example.rscarpoint.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import java.time.LocalDate;

@SpringBootApplication
public class RscarpointApplication {

    public static void main(String[] args) {
        SpringApplication.run(RscarpointApplication.class, args);
    }

    @Bean
    public CommandLineRunner createDefaultAdmin(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            String adminEmail = "admin@admin.com";
            if (userRepository.findByEmail(adminEmail) == null) {
                User admin = new User();
                admin.setName("Admin");
                admin.setEmail(adminEmail);
                admin.setRole("admin");
                admin.setStatus("active");
                admin.setPassword(passwordEncoder.encode("admin123"));
                admin.setJoinDate(LocalDate.now().toString());
                admin.setLastLogin("");
                userRepository.save(admin);
                System.out.println("Default admin user created: " + adminEmail + " / admin123");
            }
        };
    }

}
