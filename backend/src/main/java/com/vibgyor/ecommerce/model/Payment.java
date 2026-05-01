package com.vibgyor.ecommerce.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private Long paymentId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "order_id", nullable = false)
    @JsonIgnore
    private Order order;

    @Column(name = "payment_method", nullable = false)
    private String paymentMethod;

    @Column(name = "payment_status", nullable = false)
    private String paymentStatus = "Completed";

    @CreationTimestamp
    @Column(name = "payment_date", updatable = false)
    private LocalDateTime paymentDate;

    // Getters and Setters
    public Long getPaymentId() { return paymentId; }
    public void setPaymentId(Long paymentId) { this.paymentId = paymentId; }

    public Order getOrder() { return order; }
    public void setOrder(Order order) { this.order = order; }

    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }

    public String getPaymentStatus() { return paymentStatus; }
    public void setPaymentStatus(String paymentStatus) { this.paymentStatus = paymentStatus; }

    public LocalDateTime getPaymentDate() { return paymentDate; }
    public void setPaymentDate(LocalDateTime paymentDate) { this.paymentDate = paymentDate; }

    @com.fasterxml.jackson.annotation.JsonProperty("order_id")
    public Long getOrderId() {
        return order != null ? order.getOrderId() : null;
    }

    @com.fasterxml.jackson.annotation.JsonProperty("customer_name")
    public String getCustomerName() {
        return order != null && order.getUser() != null ? order.getUser().getFullName() : null;
    }

    @com.fasterxml.jackson.annotation.JsonProperty("customer_email")
    public String getCustomerEmail() {
        return order != null && order.getUser() != null ? order.getUser().getEmail() : null;
    }

    @com.fasterxml.jackson.annotation.JsonProperty("total_amount")
    public Double getTotalAmount() {
        return order != null ? order.getTotalAmount() : null;
    }

    @com.fasterxml.jackson.annotation.JsonProperty("order_status")
    public String getOrderStatus() {
        return order != null ? order.getStatus() : null;
    }
}
