package com.vibgyor.ecommerce.controller;

import com.vibgyor.ecommerce.model.CartItem;
import com.vibgyor.ecommerce.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "*")
public class CartController {

    @Autowired
    private CartService cartService;

    @GetMapping
    public List<CartItem> getCartItems(@RequestParam(value = "userId", defaultValue = "3") Long userId) {
        return cartService.getCartItems(userId);
    }

    @PostMapping
    public CartItem addToCart(@RequestBody Map<String, Object> payload) {
        Integer productId = payload.containsKey("product_id") ? Integer.parseInt(payload.get("product_id").toString()) : Integer.parseInt(payload.get("productId").toString());
        Long userId = payload.containsKey("user_id") ? Long.parseLong(payload.get("user_id").toString()) : 3L;
        Integer quantity = Integer.parseInt(payload.get("quantity").toString());
        return cartService.addToCart(userId, productId, quantity);
    }

    @PutMapping("/{cartItemId}")
    public CartItem updateQuantity(@PathVariable Long cartItemId, @RequestBody Map<String, Object> payload) {
        Integer quantity = Integer.parseInt(payload.get("quantity").toString());
        return cartService.updateQuantity(cartItemId, quantity);
    }

    @DeleteMapping("/{cartItemId}")
    public ResponseEntity<Void> removeCartItem(@PathVariable Long cartItemId) {
        cartService.removeCartItem(cartItemId);
        return ResponseEntity.ok().build();
    }
}
