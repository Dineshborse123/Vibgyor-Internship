package com.vibgyor.ecommerce.repository;

import com.vibgyor.ecommerce.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartRepository extends JpaRepository<CartItem, Long> {
    List<CartItem> findByUser_UserId(Long userId);
    Optional<CartItem> findByUser_UserIdAndProduct_ProductId(Long userId, Integer productId);
    void deleteByUser_UserId(Long userId);
}
