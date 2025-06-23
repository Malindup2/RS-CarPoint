package com.example.rscarpoint.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String name;
    private String email;
    private String role; // user, broker, admin
    private String status; // active, inactive
    private String joinDate;
    private String lastLogin;
    private String password;
} 