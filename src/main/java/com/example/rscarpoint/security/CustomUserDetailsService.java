package com.example.rscarpoint.security;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.example.rscarpoint.model.User;
import com.example.rscarpoint.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        System.out.println("Attempting to load user with email: " + email);
        
        // First try with findByEmail
        User user = userRepository.findByEmail(email);
        
        // If not found, try manually searching through all users
        if (user == null) {
            System.out.println("User not found with findByEmail, trying manual search...");
            user = userRepository.findAll().stream()
                   .filter(u -> email.equalsIgnoreCase(u.getEmail()))
                   .findFirst()
                   .orElse(null);
            
            if (user != null) {
                System.out.println("User found via manual search: " + user.getEmail());
            }
        } else {
            System.out.println("User found with findByEmail: " + user.getEmail());
        }
        
        if (user == null) {
            System.out.println("User not found with email: " + email);
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        
        System.out.println("User details - Email: " + user.getEmail() + ", Role: " + user.getRole());
        GrantedAuthority authority = new SimpleGrantedAuthority("ROLE_" + user.getRole().toUpperCase());
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), Collections.singleton(authority));
    }
} 