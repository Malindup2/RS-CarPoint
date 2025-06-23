package com.example.rscarpoint.repository;

import com.example.rscarpoint.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, String> {
    // You can add custom query methods here if needed
} 