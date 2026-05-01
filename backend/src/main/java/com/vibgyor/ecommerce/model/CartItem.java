package com.vibgyor.ecommerce.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "cart_items")
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cart_item_id")
    private Long cartItemId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "product_id", nullable = false)
    private Product product;

    @Column(name = "quantity", nullable = false)
    private Integer quantity;

    // Getters and Setters
    public Long getCartItemId() { return cartItemId; }
    public void setCartItemId(Long cartItemId) { this.cartItemId = cartItemId; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Product getProduct() { return product; }
    public void setProduct(Product product) { this.product = product; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    @com.fasterxml.jackson.annotation.JsonProperty("cart_id")
    public Long getCartId() { return cartItemId; }

    @com.fasterxml.jackson.annotation.JsonProperty("name")
    public String getName() { return product != null ? product.getName() : null; }

    @com.fasterxml.jackson.annotation.JsonProperty("price")
    public Double getPrice() { return product != null ? product.getPrice() : 0.0; }

    @com.fasterxml.jackson.annotation.JsonProperty("image_url")
    public String getImageUrl() { return product != null ? product.getImageUrl() : null; }
}
