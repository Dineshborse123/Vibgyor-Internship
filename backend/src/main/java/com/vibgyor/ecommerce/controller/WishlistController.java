package com.vibgyor.ecommerce.controller;

import com.vibgyor.ecommerce.model.Wishlist;
import com.vibgyor.ecommerce.service.WishlistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/wishlist")
@CrossOrigin(origins = "*")
public class WishlistController {

    @Autowired
    private WishlistService wishlistService;

    @GetMapping
    public ResponseEntity<List<Wishlist>> getWishlist(@RequestParam(value = "userId", defaultValue = "3") Long userId) {
        return ResponseEntity.ok(wishlistService.getWishlistByUser(userId));
    }

    @PostMapping("/add")
    public ResponseEntity<Wishlist> addToWishlist(@RequestBody Map<String, Object> payload) {
        Integer productId = payload.containsKey("product_id") ? Integer.parseInt(payload.get("product_id").toString()) : Integer.parseInt(payload.get("productId").toString());
        Long userId = payload.containsKey("user_id") ? Long.parseLong(payload.get("user_id").toString()) : 3L;
        return ResponseEntity.ok(wishlistService.addToWishlist(userId, productId));
    }

    @DeleteMapping("/remove/{productId}")
    public ResponseEntity<?> removeFromWishlist(@PathVariable Integer productId, @RequestParam(value = "userId", defaultValue = "3") Long userId) {
        wishlistService.removeFromWishlist(userId, productId);
        return ResponseEntity.ok().build();
    }
}
