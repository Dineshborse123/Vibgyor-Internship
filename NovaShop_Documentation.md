# NovaShop - End-User Documentation

**Project:** NovaShop - Full-Stack Ecommerce System  
**Submitted By:** Dinesh  
**Program:** Vibgyor Internship  
**Version:** 1.0  
**GitHub Link:** [Insert GitHub Link]  
**Hosted Link:** [Insert Hosted Link]  

---

## Table of Contents
1. Introduction
2. Accessing the Application
3. User Roles Overview
4. Customer Guide
   - 4.1 Registration & Login
   - 4.2 Browsing Products & Details
   - 4.3 Cart & Wishlist Management
   - 4.4 Checkout & Payment
   - 4.5 Order Tracking & Shipping
   - 4.6 Product Reviews & Ratings
5. Administrator Guide
   - 5.1 Admin Dashboard
   - 5.2 Category & Product Management
   - 5.3 Order & Shipping Management
   - 5.4 Customer Management
   - 5.5 Coupon & Discount Management
   - 5.6 Review Moderation
6. Database Architecture
7. Technology Stack
8. Deployment Details
9. Frequently Asked Questions (FAQ)

---

## 1. Introduction
**NovaShop** is an enterprise-grade, full-stack ecommerce web application built as part of the Vibgyor Internship program. It combines a modern online shopping experience with a robust administrator management system, supporting structured order lifecycles, real-time cart tracking, and secure payment processing.

---

## 2. Accessing the Application
**Live Deployment**
The application is accessible on the cloud:
- **Frontend URL:** [Insert Frontend Link]
- **Backend API:** [Insert Backend Link]

---

## 3. User Roles Overview
The application supports distinct user roles with tailored interfaces:

| Feature Area | Customer Role | Administrator Role |
| :--- | :--- | :--- |
| **Online Shopping** | Browse products, filter by category, add to cart/wishlist, place orders. | View active carts and analyze abandonment. |
| **Order Lifecycle** | Track order shipping and delivery status. | Manage orders, update shipping details, process refunds. |
| **User Administration** | Update profile, delete/deactivate own account. | Add new customers, deactivate/soft-delete accounts. |
| **Discounts & Reviews** | Apply coupons at checkout, leave product reviews. | Create/manage coupons, moderate/delete reviews. |

---

## 4. Customer Guide

### 4.1 Registration & Login
New users can register via the frontend:
1. Navigate to the **Login** page and click "Register here".
2. Provide First Name, Last Name, Email, Phone, and Password.
3. Upon registration, log in using the registered Email and Password.

### 4.2 Browsing Products & Details
- The **Products** page displays all active inventory.
- Click "Details" on any product card to view the description, current stock level, price, and customer reviews.

### 4.3 Cart & Wishlist Management
- **Add to Cart:** Validate stock availability and add products from the product page.
- **Update/Remove:** Adjust item quantities or remove items entirely from the Cart page. The total price is recalculated dynamically.
- **Wishlist:** Save products for later. Accessible via the sidebar menu.

### 4.4 Checkout & Payment
1. Navigate to the Cart and proceed to checkout.
2. Apply any active **Coupon/Discount Code**. The system will validate the expiration date and usage limits.
3. Select a payment method (Credit/Debit Card, PayPal, Bank Transfer).
4. Place the order. Payments are processed via external gateways (e.g., Stripe, PayPal).

### 4.5 Order Tracking & Shipping
Customers can track shipments using the provided tracking number from the courier service. The order lifecycle moves from Pending -> Confirmed -> Shipped -> Delivered.

### 4.6 Product Reviews & Ratings
After receiving a product, customers can leave a 1-5 star rating and text review. Customers can also update or delete their own reviews.

---

## 5. Administrator Guide

### 5.1 Admin Dashboard
Provides a bird's-eye view of total customers, total orders, transaction history, and recent activities.

### 5.2 Category & Product Management
Admins can manage the product catalog, updating names, prices, stock quantities, and assigning them to categories.

### 5.3 Order & Shipping Management
- View all orders and their payment status.
- Issue **Refunds** for cancelled or returned orders.
- Calculate shipping costs based on weight and delivery location.
- Update shipping information (Courier Service, Tracking Number).

### 5.4 Customer Management
Admins can view all customer details, modify contact info, and deactivate accounts using a soft-delete mechanism (status flag).

### 5.5 Coupon & Discount Management
- **Create:** Generate codes with Percentage or Fixed Amount discounts.
- **Manage:** Set `valid_from` and `valid_to` dates, and `usage_limit`.
- **Toggle:** Deactivate or delete coupons when no longer needed.

### 5.6 Review Moderation
Admins review submitted ratings. They can approve valid reviews or delete inappropriate ones to maintain platform quality.

---

## 6. Database Architecture

The system utilizes a highly structured relational database design. Key tables include:

- **users:** `user_id`, `first_name`, `last_name`, `email`, `phone`, `status`, timestamps.
- **products & categories:** Product catalog and classifications.
- **carts:** `cart_id`, `customer_id`, `product_id`, `quantity`, `total_price`, timestamps.
- **orders & payments:** Payment processing details including `amount`, `payment_method`, `payment_status`.
- **shipping:** `shipping_id`, `order_id`, `courier_service`, `tracking_number`, `shipping_status`, `shipping_cost`.
- **reviews:** `review_id`, `product_id`, `customer_id`, `rating`, `review_text`, `status`.
- **coupons:** `coupon_id`, `coupon_code`, `discount_type`, `discount_value`, `valid_to/from`, `usage_limit`, `status`.

---

## 7. Technology Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React.js (with Vite) | User interface and client-side routing |
| **Backend** | Spring Boot (Java) | REST API server handling business logic |
| **Database** | MySQL 8.0 | Relational data storage |
| **ORM** | Hibernate (Spring Data JPA) | Database interactions and entities |

---

## 8. Deployment Details
- **Frontend Hosting:** [e.g., Render/Vercel/Netlify]
- **Backend Hosting:** [e.g., Render Web Service]
- **Database Hosting:** [e.g., Aiven / Railway MySQL]

---

## 9. Frequently Asked Questions (FAQ)

**Q1: How do I create an account?**
Click "Register here" on the Login page and fill in your details. You will be registered as a Customer.

**Q2: Why is the "Add to Cart" button disabled?**
The product is currently out of stock. You can add it to your Wishlist instead.

**Q3: Can I apply multiple coupons?**
No, currently only one valid coupon can be applied per checkout process.

**Q4: How do I track my order?**
Go to the Orders section in your dashboard. Once the Admin updates the shipping details, you will see your tracking number and courier service.

---
*Generated based on system specifications and reference documentation.*
