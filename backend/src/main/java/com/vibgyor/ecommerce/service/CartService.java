package com.vibgyor.ecommerce.service;

import com.vibgyor.ecommerce.model.CartItem;
import com.vibgyor.ecommerce.model.Product;
import com.vibgyor.ecommerce.model.User;
import com.vibgyor.ecommerce.repository.CartRepository;
import com.vibgyor.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class CartService {

    @Autowired
    private CartRepository cartRepository;

    @Autowired
    private ProductRepository productRepository;

    public List<CartItem> getCartItems(Long userId) {
        return cartRepository.findByUser_UserId(userId);
    }

    public CartItem addToCart(Long userId, Integer productId, Integer quantity) {
        return cartRepository.findByUser_UserIdAndProduct_ProductId(userId, productId).map(existing -> {
            existing.setQuantity(existing.getQuantity() + quantity);
            return cartRepository.save(existing);
        }).orElseGet(() -> {
            CartItem newItem = new CartItem();
            User user = new User();
            user.setUserId(userId);
            newItem.setUser(user);
            
            Product product = productRepository.findById(productId)
                .orElseThrow(() -> new RuntimeException("Product not found"));
            newItem.setProduct(product);
            
            newItem.setQuantity(quantity);
            return cartRepository.save(newItem);
        });
    }

    public CartItem updateQuantity(Long cartItemId, Integer quantity) {
        return cartRepository.findById(cartItemId).map(item -> {
            item.setQuantity(quantity);
            return cartRepository.save(item);
        }).orElseThrow(() -> new RuntimeException("Cart item not found"));
    }

    public void removeCartItem(Long cartItemId) {
        cartRepository.deleteById(cartItemId);
    }

    @Transactional
    public void clearCart(Long userId) {
        cartRepository.deleteByUser_UserId(userId);
    }
}
