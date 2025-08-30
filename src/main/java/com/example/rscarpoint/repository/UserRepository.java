package com.example.rscarpoint.repository;

import com.example.rscarpoint.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    // You can add custom query methods here if needed
    Optional<User> findByEmail(String email);
} 