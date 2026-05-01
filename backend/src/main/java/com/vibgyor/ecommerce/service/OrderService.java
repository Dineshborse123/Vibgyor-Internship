package com.vibgyor.ecommerce.service;

import com.vibgyor.ecommerce.model.*;
import com.vibgyor.ecommerce.repository.OrderRepository;
import com.vibgyor.ecommerce.repository.ProductRepository;
import com.vibgyor.ecommerce.repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private CartService cartService;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private com.vibgyor.ecommerce.repository.CouponRepository couponRepository;

    @Transactional
    public Order placeOrder(Long userId, String shippingAddress, String couponCode) {
        List<CartItem> cartItems = cartService.getCartItems(userId);
        if (cartItems.isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        Order order = new Order();
        User user = new User();
        user.setUserId(userId);
        order.setUser(user);
        order.setShippingAddress(shippingAddress);
        
        double total = 0;
        for (CartItem item : cartItems) {
            Product product = item.getProduct();
            if (product.getStock() < item.getQuantity()) {
                throw new RuntimeException("Insufficient stock for product " + product.getName());
            }
            // Reduce stock
            product.setStock(product.getStock() - item.getQuantity());
            productRepository.save(product);

            OrderItem orderItem = new OrderItem();
            orderItem.setOrder(order);
            orderItem.setProduct(product);
            orderItem.setQuantity(item.getQuantity());
            orderItem.setPrice(product.getPrice());
            order.getItems().add(orderItem);

            total += (product.getPrice() * item.getQuantity());
        }
        
        if (couponCode != null && !couponCode.trim().isEmpty()) {
            Optional<com.vibgyor.ecommerce.model.Coupon> opt = couponRepository.findByCode(couponCode.toUpperCase());
            if (opt.isPresent() && opt.get().isActive()) {
                double discount = total * (opt.get().getDiscountPercentage() / 100.0);
                total -= discount;
            }
        }
        
        order.setTotalAmount(total);

        Order savedOrder = orderRepository.save(order);
        cartService.clearCart(userId);

        return savedOrder;
    }

    public List<Order> getUserOrders(Long userId) {
        return orderRepository.findByUser_UserIdOrderByCreatedAtDesc(userId);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Transactional
    public Order updateOrderStatus(Long orderId, String status, String courierService, String trackingNumber) {
        return orderRepository.findById(orderId).map(order -> {
            if (status != null && !status.isEmpty()) {
                order.setStatus(status);
            }
            if (courierService != null) {
                order.setCourierService(courierService);
            }
            if (trackingNumber != null) {
                order.setTrackingNumber(trackingNumber);
            }

            if ("cancelled".equalsIgnoreCase(status) || "returned".equalsIgnoreCase(status)) {
                // Restore stock only if the status is changing to cancelled/returned for the first time
                // (In a real app, you'd want to check if it was already cancelled to avoid double restoring stock)
                for (OrderItem item : order.getItems()) {
                    Product product = item.getProduct();
                    product.setStock(product.getStock() + item.getQuantity());
                    productRepository.save(product);
                }
                // Do NOT auto-refund here. The payment will now show up on the Refunds page 
                // for the Admin to manually click 'Issue Refund'.
            }

            return orderRepository.save(order);
        }).orElseThrow(() -> new RuntimeException("Order not found"));
    }
}
