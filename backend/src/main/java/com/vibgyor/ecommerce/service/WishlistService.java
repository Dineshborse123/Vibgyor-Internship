package com.vibgyor.ecommerce.service;

import com.vibgyor.ecommerce.model.Product;
import com.vibgyor.ecommerce.model.User;
import com.vibgyor.ecommerce.model.Wishlist;
import com.vibgyor.ecommerce.repository.ProductRepository;
import com.vibgyor.ecommerce.repository.UserRepository;
import com.vibgyor.ecommerce.repository.WishlistRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class WishlistService {

    @Autowired
    private WishlistRepository wishlistRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<Wishlist> getWishlistByUser(Long userId) {
        return wishlistRepository.findByUser_UserId(userId);
    }

    @Transactional
    public Wishlist addToWishlist(Long userId, Integer productId) {
        Optional<Wishlist> existing = wishlistRepository.findByUser_UserIdAndProduct_ProductId(userId, productId);
        if (existing.isPresent()) {
            return existing.get();
        }

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        Wishlist wishlist = new Wishlist();
        wishlist.setUser(user);
        wishlist.setProduct(product);
        return wishlistRepository.save(wishlist);
    }

    @Transactional
    public void removeFromWishlist(Long userId, Integer productId) {
        wishlistRepository.deleteByUser_UserIdAndProduct_ProductId(userId, productId);
    }
}
