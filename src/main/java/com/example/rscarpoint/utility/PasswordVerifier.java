package com.example.rscarpoint.utility;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PasswordVerifier {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        
        // The stored hash from MongoDB for admin@admin.com
        String storedHash = "$2a$10$ry5S7O9gsMyucFk0EREKFOoVcjU.GVBGLT7uuaTPrDlCwYKuoyzzu";
        
        // The password you're trying to use
        String expectedPassword = "admin123";
        
        // Check if the expected password matches the stored hash
        boolean matchesExpected = encoder.matches(expectedPassword, storedHash);
        
        System.out.println("=== Password Verification ===");
        System.out.println("Expected Password: " + expectedPassword);
        System.out.println("Stored Hash: " + storedHash);
        System.out.println("Does Expected Password Match Stored Hash? " + matchesExpected);
        
        if (!matchesExpected) {
            System.out.println("\n=== ISSUE DETECTED: Password Mismatch ===");
            System.out.println("The stored hash does not match the expected password.");
            
            // Generate a new hash for the expected password
            String newHash = encoder.encode(expectedPassword);
            System.out.println("\nGenerated New Hash for '" + expectedPassword + "': " + newHash);
            System.out.println("Verification of New Hash: " + encoder.matches(expectedPassword, newHash));
            
            System.out.println("\n=== SOLUTION ===");
            System.out.println("To fix this issue, update the password field in your MongoDB users collection:");
            System.out.println("db.users.updateOne(");
            System.out.println("  { email: \"admin@admin.com\" },");
            System.out.println("  { $set: { password: \"" + newHash + "\" } }");
            System.out.println(");");
        } else {
            System.out.println("\n=== Password Verification Successful ===");
            System.out.println("The stored hash correctly matches the expected password.");
            System.out.println("The issue is likely related to CORS or another authentication configuration problem.");
        }
    }
}
