package com.vibgyor.ecommerce.controller;

import com.vibgyor.ecommerce.model.Coupon;
import com.vibgyor.ecommerce.repository.CouponRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/coupons")
@CrossOrigin("*")
public class CouponController {

    @Autowired
    private CouponRepository couponRepository;

    @GetMapping
    public List<Coupon> getAllCoupons() {
        return couponRepository.findAll();
    }

    @PostMapping
    public Coupon createCoupon(@RequestBody Coupon coupon) {
        coupon.setCode(coupon.getCode().toUpperCase());
        return couponRepository.save(coupon);
    }

    @GetMapping("/validate/{code}")
    public ResponseEntity<?> validateCoupon(@PathVariable String code) {
        Optional<Coupon> couponOpt = couponRepository.findByCode(code.toUpperCase());
        if (couponOpt.isPresent()) {
            Coupon coupon = couponOpt.get();
            if (coupon.isActive()) {
                return ResponseEntity.ok(coupon);
            } else {
                return ResponseEntity.badRequest().body("Coupon is inactive.");
            }
        }
        return ResponseEntity.badRequest().body("Invalid coupon code.");
    }

    @PutMapping("/{id}/toggle")
    public Coupon toggleCoupon(@PathVariable Long id) {
        Coupon coupon = couponRepository.findById(id).orElseThrow(() -> new RuntimeException("Coupon not found"));
        coupon.setActive(!coupon.isActive());
        return couponRepository.save(coupon);
    }
}
