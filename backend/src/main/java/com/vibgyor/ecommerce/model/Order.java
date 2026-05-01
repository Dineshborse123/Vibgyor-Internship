package com.vibgyor.ecommerce.model;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "order_id")
    @com.fasterxml.jackson.annotation.JsonProperty("order_id")
    private Long orderId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @JsonIgnore
    private User user;

    @Column(name = "total_amount", nullable = false)
    @com.fasterxml.jackson.annotation.JsonProperty("total_amount")
    private Double totalAmount;

    @Column(name = "status", nullable = false)
    private String status = "Pending";

    @Column(name = "shipping_address", length = 500)
    private String shippingAddress;

    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    @com.fasterxml.jackson.annotation.JsonProperty("created_at")
    private LocalDateTime createdAt;

    @Column(name = "courier_service")
    @com.fasterxml.jackson.annotation.JsonProperty("courier_service")
    private String courierService = "Pending Assignment";

    @Column(name = "tracking_number")
    @com.fasterxml.jackson.annotation.JsonProperty("tracking_number")
    private String trackingNumber = "Not assigned";

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<OrderItem> items = new ArrayList<>();

    // Getters and Setters
    public Long getOrderId() { return orderId; }
    public void setOrderId(Long orderId) { this.orderId = orderId; }

    public User getUser() { return user; }
    public void setUser(User user) { this.user = user; }

    public Double getTotalAmount() { return totalAmount; }
    public void setTotalAmount(Double totalAmount) { this.totalAmount = totalAmount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getShippingAddress() { return shippingAddress; }
    public void setShippingAddress(String shippingAddress) { this.shippingAddress = shippingAddress; }

    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }

    public List<OrderItem> getItems() { return items; }
    public void setItems(List<OrderItem> items) { this.items = items; }

    @com.fasterxml.jackson.annotation.JsonProperty("customer_name")
    public String getCustomerName() {
        return user != null ? user.getFullName() : "Unknown";
    }

    @com.fasterxml.jackson.annotation.JsonProperty("email")
    public String getEmail() {
        return user != null ? user.getEmail() : "Unknown";
    }

    public String getCourierService() { return courierService; }
    public void setCourierService(String courierService) { this.courierService = courierService; }

    public String getTrackingNumber() { return trackingNumber; }
    public void setTrackingNumber(String trackingNumber) { this.trackingNumber = trackingNumber; }
}
