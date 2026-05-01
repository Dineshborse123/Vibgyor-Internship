package com.vibgyor.ecommerce.service;

import com.vibgyor.ecommerce.model.Order;
import com.vibgyor.ecommerce.model.Payment;
import com.vibgyor.ecommerce.repository.OrderRepository;
import com.vibgyor.ecommerce.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private com.vibgyor.ecommerce.repository.ProductRepository productRepository;

    @Transactional
    public Payment processPayment(Long orderId, String paymentMethod) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        Payment payment = new Payment();
        payment.setOrder(order);
        payment.setPaymentMethod(paymentMethod);
        payment.setPaymentStatus("Completed");

        // Assuming payment succeeds, update order status
        order.setStatus("Processing");
        orderRepository.save(order);

        return paymentRepository.save(payment);
    }

    public Optional<Payment> getPaymentByOrderId(Long orderId) {
        return paymentRepository.findByOrder_OrderId(orderId);
    }

    public java.util.List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @Transactional
    public Payment updatePaymentStatus(Long paymentId, String status) {
        return paymentRepository.findById(paymentId).map(payment -> {
            payment.setPaymentStatus(status);
            if ("Refunded".equalsIgnoreCase(status)) {
                Order order = payment.getOrder();
                if (order != null) {
                    String currentStatus = order.getStatus();
                    if (!"cancelled".equalsIgnoreCase(currentStatus) && !"returned".equalsIgnoreCase(currentStatus)) {
                        throw new RuntimeException("Cannot issue refund: Order is not cancelled or returned");
                    }
                    // Since order is cancelled, we can just process the refund on the payment.
                    // Stock is already restored in OrderService when status changes to cancelled.
                }
            }
            
            return paymentRepository.save(payment);
        }).orElseThrow(() -> new RuntimeException("Payment not found"));
    }
}
