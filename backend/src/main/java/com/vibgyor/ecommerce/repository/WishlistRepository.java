package com.vibgyor.ecommerce.repository;

import com.vibgyor.ecommerce.model.Wishlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface WishlistRepository extends JpaRepository<Wishlist, Long> {
    List<Wishlist> findByUser_UserId(Long userId);
    Optional<Wishlist> findByUser_UserIdAndProduct_ProductId(Long userId, Integer productId);
    void deleteByUser_UserIdAndProduct_ProductId(Long userId, Integer productId);
}
