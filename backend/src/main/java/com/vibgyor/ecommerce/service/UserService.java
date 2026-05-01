package com.vibgyor.ecommerce.service;

import com.vibgyor.ecommerce.model.User;
import com.vibgyor.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User registerUser(User user) {
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists");
        }
        // In a real app, hash password here using BCrypt
        return userRepository.save(user);
    }

    public Optional<User> authenticateUser(String email, String password) {
        // In a real app, compare hashed password
        return userRepository.findByEmail(email)
                .filter(user -> user.getPassword().equals(password));
    }
    
    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User updateUserStatus(Long userId, String statusStr) {
        return userRepository.findById(userId).map(user -> {
            boolean isActive = "active".equalsIgnoreCase(statusStr);
            user.setStatus(isActive);
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User updateUserPassword(Long userId, String newPassword) {
        return userRepository.findById(userId).map(user -> {
            user.setPassword(newPassword);
            return userRepository.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }
}
