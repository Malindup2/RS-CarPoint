package com.example.rscarpoint.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDto {
    private String id;
    private String name;
    private String email;
    private String role;
    private String status;
    private String joinDate;
    private String lastLogin;
    // Note: password is intentionally excluded for security
}
