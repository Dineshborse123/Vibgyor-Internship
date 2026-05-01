package com.vibgyor.ecommerce.controller;

import com.vibgyor.ecommerce.model.Leave;
import com.vibgyor.ecommerce.model.User;
import com.vibgyor.ecommerce.repository.LeaveRepository;
import com.vibgyor.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/leaves")
@CrossOrigin(origins = "*")
public class LeaveController {

    @Autowired
    private LeaveRepository leaveRepository;

    @Autowired
    private UserRepository userRepository;

    @GetMapping
    public ResponseEntity<?> getLeaves(@RequestParam(required = false) Long userId) {
        List<Leave> leaves;
        if (userId != null) {
            leaves = leaveRepository.findByUserId(userId);
        } else {
            leaves = leaveRepository.findAllByOrderByCreatedAtDesc();
        }

        // Attach user info for Admin view
        List<Map<String, Object>> response = new ArrayList<>();
        for (Leave leave : leaves) {
            Map<String, Object> map = new HashMap<>();
            map.put("id", leave.getId());
            map.put("reason", leave.getReason());
            map.put("start_date", leave.getStartDate());
            map.put("end_date", leave.getEndDate());
            map.put("status", leave.getStatus());
            map.put("created_at", leave.getCreatedAt());

            userRepository.findById(leave.getUserId()).ifPresent(u -> {
                map.put("name", u.getFullName());
                map.put("email", u.getEmail());
            });

            response.add(map);
        }

        return ResponseEntity.ok(response);
    }

    @PostMapping
    public ResponseEntity<?> createLeave(@RequestBody Leave leave) {
        if (leave.getUserId() == null) {
            return ResponseEntity.badRequest().body(Map.of("message", "User ID is required"));
        }
        leave.setStatus("pending");
        leave.setCreatedAt(new Date());
        Leave saved = leaveRepository.save(leave);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateLeaveStatus(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        Optional<Leave> opt = leaveRepository.findById(id);
        if (opt.isPresent()) {
            Leave leave = opt.get();
            leave.setStatus(payload.get("status"));
            leaveRepository.save(leave);
            return ResponseEntity.ok(leave);
        }
        return ResponseEntity.notFound().build();
    }
}
