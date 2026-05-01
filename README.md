# ⚡ NovaShop - Next-Gen Retail

Welcome to **NovaShop**, a fully functional, modern e-commerce platform built as part of an internship project. This repository contains both the **Frontend** (React + Vite) and **Backend** (Spring Boot + MySQL).

This guide will walk you through exactly how to set up the project on your local machine from scratch. Even if you are completely new, just follow these steps sequentially and you'll have the website running in no time!

---

## 🛠️ Tech Stack
- **Frontend:** React, Vite, React Router, Axios, Custom CSS (Orange/Slate Theme)
- **Backend:** Java 17, Spring Boot 3, Spring Data JPA, Hibernate
- **Database:** MySQL

---

## 🚀 Step-by-Step Setup Guide

### Step 1: Prerequisites
Before you begin, make sure you have the following installed on your system:
1. **Node.js** (v18 or higher) - [Download Here](https://nodejs.org/)
2. **Java JDK 17** - [Download Here](https://adoptium.net/)
3. **Maven** - [Download Here](https://maven.apache.org/) (Ensure `mvn` is added to your PATH)
4. **MySQL Server** - [Download Here](https://dev.mysql.com/downloads/installer/)

### Step 2: Database Setup
The backend uses MySQL. You need to create a database and ensure your credentials match.
1. Open your MySQL client (e.g., MySQL Workbench or Command Line).
2. The database `E_Commerce` will be **automatically created** by Spring Boot if it doesn't exist.
3. Ensure your root username and password are set to `root` / `root`. 
   > *Note: If your MySQL password is different, go to `backend/src/main/resources/application.properties` and change `spring.datasource.password` to match your local password.*

---

### Step 3: Running the Backend (Spring Boot)
The backend serves as the API for our application, running on port `8080`.

1. Open your terminal or command prompt.
2. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
3. Clean and build the project using Maven:
   ```bash
   mvn clean install
   ```
4. Start the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
5. You should see a log saying `Tomcat started on port 8080`. Your backend is now live! Leave this terminal open.

---

### Step 4: Running the Frontend (React + Vite)
The frontend is the user interface of our application, running on port `5173`.

1. Open a **new** terminal window (keep the backend running in the first one).
2. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
3. Install all the required Node dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```
5. Open your browser and go to `http://localhost:5173`. You should now see the beautiful NovaShop interface!

---

## 🔑 Default Accounts for Testing

Once the application is running, the database will automatically generate tables. You can register a new account on the website or use the following roles for testing different features:

### 1. Admin Account
Admins have access to the **Dashboard** where they can manage products, view sales metrics, and oversee the platform.
- *Create a user via the register page and manually change their role to `admin` in the MySQL `users` table.*

### 2. Employee Account
Employees have access to their portal to manage leave requests and handle customer support tickets.
- *Create a user via the register page and manually change their role to `employee` in the MySQL `users` table.*

### 3. Customer Account
Standard users who can browse products, add items to their cart/wishlist, and checkout.
- *Simply register a new account from the `/register` page.*

---

## ✨ Key Features to Explore
- **Modern UI:** Switch between responsive views, notice the glassmorphism and modern color palette.
- **Wishlist & Cart:** Add items to your wishlist or cart, the counts update in real-time.
- **Checkout Flow:** Experience a seamless checkout flow with form validations.
- **Inline Reviews:** After successfully placing an order, review your purchased items directly from the success screen!

---

## 🛑 Troubleshooting

- **Backend fails to start / Port 8080 is already in use:**
  You likely have another process running on port 8080. You can stop it or change `server.port=8081` in `application.properties`.
- **Database Connection Error:**
  Ensure MySQL is running as a service on your machine and the password in `application.properties` matches your MySQL root password.
- **Frontend shows "Network Error":**
  This means the React app cannot reach the backend. Ensure your Spring Boot backend is actively running and there are no errors in its terminal.

---
*Developed with ❤️ as part of the Vibgyor Internship Project.*
