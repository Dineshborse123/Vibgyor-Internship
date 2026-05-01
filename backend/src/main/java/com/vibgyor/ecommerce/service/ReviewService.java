package com.vibgyor.ecommerce.service;

import com.vibgyor.ecommerce.model.Product;
import com.vibgyor.ecommerce.model.Review;
import com.vibgyor.ecommerce.model.User;
import com.vibgyor.ecommerce.repository.ProductRepository;
import com.vibgyor.ecommerce.repository.ReviewRepository;
import com.vibgyor.ecommerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public List<Review> getApprovedReviewsForProduct(Integer productId) {
        return reviewRepository.findByProduct_ProductIdAndStatus(productId, "Approved");
    }

    public Review submitReview(Long userId, Integer productId, Integer rating, String comment) {
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productRepository.findById(productId).orElseThrow(() -> new RuntimeException("Product not found"));

        Review review = new Review();
        review.setUser(user);
        review.setProduct(product);
        review.setRating(rating);
        review.setComment(comment);
        review.setStatus("Pending");

        return reviewRepository.save(review);
    }

    public Review updateReviewStatus(Long reviewId, String status) {
        Review review = reviewRepository.findById(reviewId).orElseThrow(() -> new RuntimeException("Review not found"));
        review.setStatus(status);
        return reviewRepository.save(review);
    }

    public void deleteReview(Long reviewId) {
        reviewRepository.deleteById(reviewId);
    }
}
