package com.vibgyor.ecommerce.controller;

import com.vibgyor.ecommerce.model.Review;
import com.vibgyor.ecommerce.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
@CrossOrigin(origins = "*")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping
    public List<Review> getAllReviews() {
        return reviewService.getAllReviews();
    }

    @GetMapping("/product/{productId}")
    public List<Review> getProductReviews(@PathVariable Integer productId) {
        return reviewService.getApprovedReviewsForProduct(productId);
    }

    @PostMapping
    public ResponseEntity<Review> submitReview(@RequestBody Map<String, Object> payload) {
        Long userId = payload.containsKey("user_id") ? Long.parseLong(payload.get("user_id").toString()) : 3L;
        Integer productId = payload.containsKey("product_id") ? Integer.parseInt(payload.get("product_id").toString()) : Integer.parseInt(payload.get("productId").toString());
        Integer rating = Integer.parseInt(payload.get("rating").toString());
        String comment = payload.containsKey("comment") ? payload.get("comment").toString() : "";

        return ResponseEntity.ok(reviewService.submitReview(userId, productId, rating, comment));
    }

    @PutMapping("/{reviewId}/status")
    public ResponseEntity<Review> updateReviewStatus(@PathVariable Long reviewId, @RequestBody Map<String, String> payload) {
        String status = payload.get("status");
        return ResponseEntity.ok(reviewService.updateReviewStatus(reviewId, status));
    }

    @DeleteMapping("/{reviewId}")
    public ResponseEntity<Void> deleteReview(@PathVariable Long reviewId) {
        reviewService.deleteReview(reviewId);
        return ResponseEntity.ok().build();
    }
}
