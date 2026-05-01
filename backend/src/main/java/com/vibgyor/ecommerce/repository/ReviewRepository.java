package com.vibgyor.ecommerce.repository;

import com.vibgyor.ecommerce.model.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {
    List<Review> findByProduct_ProductIdAndStatus(Integer productId, String status);
    List<Review> findByStatus(String status);
}
