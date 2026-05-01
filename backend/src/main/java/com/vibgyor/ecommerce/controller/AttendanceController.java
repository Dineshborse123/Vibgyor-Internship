package com.vibgyor.ecommerce.controller;

import com.vibgyor.ecommerce.model.Attendance;
import com.vibgyor.ecommerce.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/attendance")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AttendanceController {

    @Autowired
    private AttendanceRepository attendanceRepository;

    @GetMapping("/all")
    public ResponseEntity<List<Attendance>> getAllAttendance() {
        return ResponseEntity.ok(attendanceRepository.findAll());
    }

    @PostMapping("/check-in")
    public ResponseEntity<?> checkIn(@RequestBody java.util.Map<String, Long> payload) {
        Long userId = payload.get("userId");
        if (userId == null) {
            return ResponseEntity.badRequest().body("User ID is required");
        }
        
        Attendance attendance = new Attendance();
        attendance.setUserId(userId);
        attendance.setCheckIn(new Date());
        attendance.setStatus("PRESENT");
        
        attendanceRepository.save(attendance);
        return ResponseEntity.ok(attendance);
    }

    @PostMapping("/check-out")
    public ResponseEntity<?> checkOut(@RequestBody java.util.Map<String, Long> payload) {
        Long userId = payload.get("userId");
        if (userId == null) {
            return ResponseEntity.badRequest().body("User ID is required");
        }
        
        // Very basic implementation: just find the last checkin for this user
        List<Attendance> records = attendanceRepository.findByUserId(userId);
        if (records.isEmpty()) {
            return ResponseEntity.badRequest().body("No check-in record found");
        }
        
        Attendance lastRecord = records.get(records.size() - 1);
        if (lastRecord.getCheckOut() != null) {
            return ResponseEntity.badRequest().body("Already checked out");
        }
        
        lastRecord.setCheckOut(new Date());
        attendanceRepository.save(lastRecord);
        return ResponseEntity.ok(lastRecord);
    }

    @GetMapping("/today")
    public ResponseEntity<?> getTodayAttendance(@RequestParam Long userId) {
        List<Attendance> records = attendanceRepository.findByUserId(userId);
        if (records.isEmpty()) {
            return ResponseEntity.ok().build(); // Empty response for no attendance
        }
        // Basic impl: return the latest record
        return ResponseEntity.ok(records.get(records.size() - 1));
    }

    @PostMapping("/toggle")
    public ResponseEntity<?> toggleShift(@RequestBody java.util.Map<String, Long> payload) {
        Long userId = payload.get("userId");
        if (userId == null) return ResponseEntity.badRequest().body("User ID required");
        
        List<Attendance> records = attendanceRepository.findByUserId(userId);
        
        if (records.isEmpty() || records.get(records.size() - 1).getCheckOut() != null) {
            // Clock-In (Start Shift)
            Attendance attendance = new Attendance();
            attendance.setUserId(userId);
            attendance.setCheckIn(new Date());
            attendance.setStatus("PRESENT");
            attendanceRepository.save(attendance);
            return ResponseEntity.ok(attendance);
        } else {
            // Clock-Out (End Shift)
            Attendance lastRecord = records.get(records.size() - 1);
            lastRecord.setCheckOut(new Date());
            attendanceRepository.save(lastRecord);
            return ResponseEntity.ok(lastRecord);
        }
    }
}
