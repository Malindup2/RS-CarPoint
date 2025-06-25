package com.example.rscarpoint.utility;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class AdminUserCreator {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String rawPassword = "admin123";
        String encodedPassword = encoder.encode(rawPassword);
        
        System.out.println("=== Create Admin User ===");
        System.out.println("Raw Password: " + rawPassword);
        System.out.println("Encoded Password: " + encodedPassword);
        
        // MongoDB command to insert admin user
        System.out.println("\n=== MongoDB Command to Insert Admin User ===");
        System.out.println("db.users.insertOne({");
        System.out.println("  name: \"Admin\",");
        System.out.println("  email: \"admin@admin.com\",");
        System.out.println("  role: \"admin\",");
        System.out.println("  status: \"active\",");
        System.out.println("  joinDate: \"2025-06-25\",");
        System.out.println("  lastLogin: \"\",");
        System.out.println("  password: \"" + encodedPassword + "\"");
        System.out.println("});");
        
        // MongoDB command to update existing admin user
        System.out.println("\n=== MongoDB Command to Update Existing Admin User ===");
        System.out.println("db.users.updateOne(");
        System.out.println("  { email: \"admin@admin.com\" },");
        System.out.println("  { $set: { password: \"" + encodedPassword + "\" } }");
        System.out.println(");");
    }
}
