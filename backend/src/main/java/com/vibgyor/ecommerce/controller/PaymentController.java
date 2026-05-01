package com.vibgyor.ecommerce.controller;

import com.vibgyor.ecommerce.model.Payment;
import com.vibgyor.ecommerce.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/payment")
@CrossOrigin(origins = "*")
public class PaymentController {

    @Autowired
    private PaymentService paymentService;

    @PostMapping
    public Payment processPayment(@RequestBody Map<String, Object> payload) {
        Object orderIdObj = payload.containsKey("order_id") ? payload.get("order_id") : payload.get("orderId");
        Object methodObj = payload.containsKey("method") ? payload.get("method") : payload.get("paymentMethod");
        Long orderId = Long.valueOf(orderIdObj.toString());
        String paymentMethod = methodObj.toString();
        return paymentService.processPayment(orderId, paymentMethod);
    }

    @GetMapping("/order/{orderId}")
    public ResponseEntity<Payment> getPaymentByOrderId(@PathVariable Long orderId) {
        return paymentService.getPaymentByOrderId(orderId)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/all")
    public java.util.List<Payment> getAllPayments() {
        return paymentService.getAllPayments();
    }

    @PutMapping("/{paymentId}/status")
    public Payment updatePaymentStatus(@PathVariable Long paymentId, @RequestBody Map<String, String> payload) {
        return paymentService.updatePaymentStatus(paymentId, payload.get("status"));
    }
}
