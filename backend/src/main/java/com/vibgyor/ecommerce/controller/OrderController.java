package com.vibgyor.ecommerce.controller;

import com.vibgyor.ecommerce.model.Order;
import com.vibgyor.ecommerce.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public Order placeOrder(@RequestBody Map<String, Object> payload) {
        String address = payload.containsKey("shipping_address") ? payload.get("shipping_address").toString() : payload.get("shippingAddress").toString();
        Long userId = payload.containsKey("user_id") ? Long.valueOf(payload.get("user_id").toString()) : 3L;
        String couponCode = payload.containsKey("couponCode") ? payload.get("couponCode").toString() : null;
        return orderService.placeOrder(userId, address, couponCode);
    }

    @GetMapping
    public List<Order> getUserOrders(@RequestParam(value = "userId", defaultValue = "3") Long userId) {
        return orderService.getUserOrders(userId);
    }

    @GetMapping("/all")
    public List<Order> getAllOrders() {
        return orderService.getAllOrders();
    }

    @PutMapping("/{orderId}/status")
    public Order updateOrderStatus(@PathVariable Long orderId, @RequestBody Map<String, String> payload) {
        return orderService.updateOrderStatus(
            orderId, 
            payload.get("status"), 
            payload.get("courierService"), 
            payload.get("trackingNumber")
        );
    }
}
