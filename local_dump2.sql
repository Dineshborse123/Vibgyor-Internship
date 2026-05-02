-- MySQL dump 10.13  Distrib 8.0.43, for Win64 (x86_64)
--
-- Host: localhost    Database: E_Commerce
-- ------------------------------------------------------
-- Server version	8.0.43

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `check_in` datetime(6) DEFAULT NULL,
  `check_out` datetime(6) DEFAULT NULL,
  `status` varchar(20) DEFAULT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES (1,'2026-05-01 09:50:13.753000',NULL,'PRESENT',4);
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cart_items`
--

DROP TABLE IF EXISTS `cart_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart_items` (
  `cart_item_id` bigint NOT NULL AUTO_INCREMENT,
  `quantity` int NOT NULL,
  `product_id` int NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`cart_item_id`),
  KEY `FK1re40cjegsfvw58xrkdp6bac6` (`product_id`),
  KEY `FK709eickf3kc0dujx3ub9i7btf` (`user_id`),
  CONSTRAINT `FK1re40cjegsfvw58xrkdp6bac6` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  CONSTRAINT `FK709eickf3kc0dujx3ub9i7btf` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart_items`
--

LOCK TABLES `cart_items` WRITE;
/*!40000 ALTER TABLE `cart_items` DISABLE KEYS */;
INSERT INTO `cart_items` VALUES (38,1,2,10);
/*!40000 ALTER TABLE `cart_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `category_id` int NOT NULL AUTO_INCREMENT,
  `category_name` varchar(100) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `description` varchar(300) DEFAULT NULL,
  `status` bit(1) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Electronics','2026-04-08 13:08:46.142127','Gizmos, gadgets, and computers',_binary '','2026-04-09 09:55:01.675155'),(3,'Books','2026-05-01 15:48:56.000000','Physical and digital books',_binary '','2026-05-01 15:48:56.000000'),(4,'Clothing','2026-05-01 15:48:56.000000','Apparel and accessories',_binary '','2026-05-01 15:48:56.000000');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `coupons`
--

DROP TABLE IF EXISTS `coupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `coupons` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `active` bit(1) NOT NULL,
  `code` varchar(255) NOT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `discount_percentage` double NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_eplt0kkm9yf2of2lnx6c1oy9b` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `coupons`
--

LOCK TABLES `coupons` WRITE;
/*!40000 ALTER TABLE `coupons` DISABLE KEYS */;
INSERT INTO `coupons` VALUES (1,_binary '','WELCOME20','2026-05-01 21:21:29.000000',20),(2,_binary '','DIWALI50','2026-05-01 21:21:29.000000',50),(3,_binary '','FREESHIP10','2026-05-01 21:21:29.000000',10),(4,_binary '','SUMMER5','2026-05-01 15:55:26.552777',5);
/*!40000 ALTER TABLE `coupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leaves`
--

DROP TABLE IF EXISTS `leaves`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leaves` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `reason` varchar(500) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `status` varchar(255) DEFAULT NULL,
  `user_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leaves`
--

LOCK TABLES `leaves` WRITE;
/*!40000 ALTER TABLE `leaves` DISABLE KEYS */;
INSERT INTO `leaves` VALUES (1,'2026-05-01 10:01:27.245000','2026-06-23','i am going to village ','2026-05-28','approved',4),(2,'2026-05-01 17:18:35.050000','2026-06-25','going to village','2026-05-22','approved',12);
/*!40000 ALTER TABLE `leaves` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_items`
--

DROP TABLE IF EXISTS `order_items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_items` (
  `order_item_id` bigint NOT NULL AUTO_INCREMENT,
  `price` double NOT NULL,
  `quantity` int NOT NULL,
  `order_id` bigint NOT NULL,
  `product_id` int NOT NULL,
  PRIMARY KEY (`order_item_id`),
  KEY `FKbioxgbv59vetrxe0ejfubep1w` (`order_id`),
  KEY `FKocimc7dtr037rh4ls4l95nlfi` (`product_id`),
  CONSTRAINT `FKbioxgbv59vetrxe0ejfubep1w` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `FKocimc7dtr037rh4ls4l95nlfi` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_items`
--

LOCK TABLES `order_items` WRITE;
/*!40000 ALTER TABLE `order_items` DISABLE KEYS */;
INSERT INTO `order_items` VALUES (19,45000,1,8,1),(20,4500,1,8,2),(21,850,1,8,7),(22,2499,1,8,12),(23,45000,1,9,1),(24,4500,1,9,2),(25,850,1,9,7),(26,45000,2,10,1),(27,4500,2,10,2),(28,95000,1,10,3),(29,3500,1,10,4),(30,45000,1,11,1),(31,4500,1,11,2),(32,95000,1,11,3),(33,45000,2,12,1),(34,45000,1,13,1),(35,550,2,13,6),(36,45000,1,14,1),(37,45000,1,15,1),(38,4500,1,16,2),(39,95000,1,16,3),(40,2499,1,17,12);
/*!40000 ALTER TABLE `order_items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` bigint NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `shipping_address` varchar(500) DEFAULT NULL,
  `status` varchar(255) NOT NULL,
  `total_amount` double NOT NULL,
  `user_id` bigint NOT NULL,
  `courier_service` varchar(255) DEFAULT NULL,
  `tracking_number` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`order_id`),
  KEY `FK32ql8ubntj5uh44ph9659tiih` (`user_id`),
  CONSTRAINT `FK32ql8ubntj5uh44ph9659tiih` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (8,'2026-05-01 13:51:21.581952','Dinesh Borse, 1234567896\nhaji malang, Namskar dhaba malang road\nmumbai, Maharashtra - 421306','Delivered',52849,3,NULL,NULL),(9,'2026-05-01 13:52:22.052031','mayuri, 8591679695\ntulsi , Namskar dhaba malang road\nkalyan, Maharashtra - 421306','delivered',50350,3,NULL,NULL),(10,'2026-05-01 14:18:54.556169','test','delivered',197500,11,NULL,NULL),(11,'2026-05-01 14:25:27.915884','test address','Cancelled',144500,11,NULL,NULL),(12,'2026-05-01 14:36:49.080194','mayuri, 8591679694\nnamskar dhaba room no 203, Namskar dhaba malang road\nkalyan, Maharashtra - 421306','Cancelled',90000,11,NULL,NULL),(13,'2026-05-01 14:37:54.630424','dinesh, 8591679694\ntulsi park, Namskar dhaba malang road\nkalyan, Maharashtra - 421306','Processing',46100,10,'Pending Assignment','Not assigned'),(14,'2026-05-01 15:56:32.854470','Dinesh Borse, 8591679694\nhjujn, Namskar dhaba malang road\nkalyan, Maharashtra - 421306','Processing',45000,10,'Pending Assignment','Not assigned'),(15,'2026-05-01 16:35:03.155520','Test','Pending',45000,3,'Pending Assignment','Not assigned'),(16,'2026-05-01 16:59:45.256231','Dinesh Borse, 8591679694\nhaji, Namskar dhaba malang road\nmumbai, Maharashtra - 421306','Processing',99500,11,'Pending Assignment','Not assigned'),(17,'2026-05-01 17:14:41.693629','Dinesh Borse, 1234567896\nshanti, Tulsi park A/203\nmumbai, Maharashtra - 421306','Processing',2499,11,'Pending Assignment','Not assigned');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `payment_id` bigint NOT NULL AUTO_INCREMENT,
  `payment_date` datetime(6) DEFAULT NULL,
  `payment_method` varchar(255) NOT NULL,
  `payment_status` varchar(255) NOT NULL,
  `order_id` bigint NOT NULL,
  PRIMARY KEY (`payment_id`),
  UNIQUE KEY `UK_8vo36cen604as7etdfwmyjsxt` (`order_id`),
  CONSTRAINT `FK81gagumt0r8y3rmudcgpbk42l` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (7,'2026-05-01 13:51:21.631490','UPI','Refunded',8),(8,'2026-05-01 13:52:22.086186','Cash on Delivery','Refunded',9),(9,'2026-05-01 14:19:05.458937','UPI','Completed',10),(10,'2026-05-01 14:36:49.218798','Cash on Delivery','Refunded',12),(11,'2026-05-01 14:37:54.671692','UPI','Refunded',13),(12,'2026-05-01 15:56:32.961113','UPI','Completed',14),(13,'2026-05-01 16:59:45.339881','UPI','Completed',16),(14,'2026-05-01 17:14:41.766438','UPI','Completed',17);
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `product_id` int NOT NULL AUTO_INCREMENT,
  `created_at` datetime(6) DEFAULT NULL,
  `description` varchar(1000) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `price` double NOT NULL,
  `status` varchar(255) NOT NULL,
  `stock` int NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `category_id` int NOT NULL,
  `image_url` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`product_id`),
  KEY `FKog2rp4qthbtt2lfyhfo32lsw9` (`category_id`),
  CONSTRAINT `FKog2rp4qthbtt2lfyhfo32lsw9` FOREIGN KEY (`category_id`) REFERENCES `categories` (`category_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (1,'2026-05-01 15:48:56.000000','Latest 5G smartphone with 128GB storage','Smartphone Pro',45000,'Active',55,'2026-05-01 16:35:03.199961',1,'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400&auto=format&fit=crop'),(2,'2026-05-01 15:48:56.000000','Noise-cancelling wireless headphones','Wireless Headphones',4500,'Active',107,'2026-05-01 16:59:45.282096',1,'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop'),(3,'2026-05-01 15:48:56.000000','High-performance gaming laptop with RTX 4060','Gaming Laptop',95000,'Active',24,'2026-05-01 16:59:45.296996',1,'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=400&auto=format&fit=crop'),(4,'2026-05-01 15:48:56.000000','Fitness tracker and smartwatch with heart rate monitor','Smartwatch',3500,'Active',74,'2026-05-01 14:18:54.595709',1,'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop'),(5,'2026-05-01 15:48:56.000000','Classic novel by F. Scott Fitzgerald','The Great Gatsby',350,'Active',201,'2026-05-01 13:43:27.151273',3,'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop'),(6,'2026-05-01 15:48:56.000000','An Easy & Proven Way to Build Good Habits','Atomic Habits',550,'Active',152,'2026-05-01 14:41:08.769584',3,'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&auto=format&fit=crop'),(7,'2026-05-01 15:48:56.000000','A Handbook of Agile Software Craftsmanship','Clean Code',850,'Active',82,'2026-05-01 14:41:15.357724',3,'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=400&auto=format&fit=crop'),(8,'2026-05-01 15:48:56.000000','Science fiction novel by Frank Herbert','Dune',650,'Active',121,'2026-05-01 13:44:13.171053',3,'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?q=80&w=400&auto=format&fit=crop'),(9,'2026-05-01 15:48:56.000000','Comfortable 100% cotton casual t-shirt','Men\'s Cotton T-Shirt',599,'Active',300,'2026-05-01 15:48:56.000000',4,'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400&auto=format&fit=crop'),(10,'2026-05-01 15:48:56.000000','Classic blue denim jeans for men','Denim Jeans',1299,'Active',150,'2026-05-01 15:48:56.000000',4,'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=400&auto=format&fit=crop'),(11,'2026-05-01 15:48:56.000000','Summer floral dress for women','Women\'s Floral Dress',1599,'Active',90,'2026-05-01 15:48:56.000000',4,'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=400&auto=format&fit=crop'),(12,'2026-05-01 15:48:56.000000','Lightweight running shoes for daily workouts','Running Shoes',2499,'Active',112,'2026-05-01 17:14:41.718359',4,'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reviews`
--

DROP TABLE IF EXISTS `reviews`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `reviews` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `comment` varchar(1000) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `rating` int NOT NULL,
  `status` varchar(255) NOT NULL,
  `product_id` int NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FKpl51cejpw4gy5swfar8br9ngi` (`product_id`),
  KEY `FKcgy7qjc1r99dp117y9en6lxye` (`user_id`),
  CONSTRAINT `FKcgy7qjc1r99dp117y9en6lxye` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`),
  CONSTRAINT `FKpl51cejpw4gy5swfar8br9ngi` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reviews`
--

LOCK TABLES `reviews` WRITE;
/*!40000 ALTER TABLE `reviews` DISABLE KEYS */;
INSERT INTO `reviews` VALUES (1,'This is a great product! Highly recommended.','2026-05-01 20:23:54.000000',4,'Approved',1,11),(2,'very beautyful','2026-05-01 15:06:00.103330',5,'Approved',2,11),(3,'very nice','2026-05-01 17:14:55.216712',5,'Pending',12,11);
/*!40000 ALTER TABLE `reviews` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` bigint NOT NULL AUTO_INCREMENT,
  `address` varchar(500) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `email` varchar(150) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `role` varchar(20) NOT NULL,
  `status` bit(1) NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `UK_6dotkott2kjsp8vw4d0m25fb7` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,NULL,'2026-05-01 14:58:02.000000','admin@shopvibe.com','Admin User','admin123',NULL,'admin',_binary '','2026-05-01 14:58:02.000000'),(4,NULL,'2026-05-01 09:42:01.877353','yash8591@gmail.com','Yash Singh','yash1234',NULL,'employee',_binary '','2026-05-01 09:42:01.877353'),(10,NULL,'2026-05-01 13:50:03.974753','dineshborse9321@gmail.com','Dinesh','123456',NULL,'CUSTOMER',_binary '','2026-05-01 13:50:03.974753'),(11,NULL,'2026-05-01 13:50:27.405017','mayuri256@gmail.com','Mayuri','123456',NULL,'CUSTOMER',_binary '','2026-05-01 13:50:27.405017'),(12,NULL,'2026-05-01 17:17:59.297365','simran523@gmail.com','simran','123456',NULL,'employee',_binary '','2026-05-01 17:17:59.297365');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wishlist`
--

DROP TABLE IF EXISTS `wishlist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wishlist` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `added_at` datetime(6) DEFAULT NULL,
  `product_id` int NOT NULL,
  `user_id` bigint NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK6p7qhvy1bfkri13u29x6pu8au` (`product_id`),
  KEY `FKtrd6335blsefl2gxpb8lr0gr7` (`user_id`),
  CONSTRAINT `FK6p7qhvy1bfkri13u29x6pu8au` FOREIGN KEY (`product_id`) REFERENCES `products` (`product_id`),
  CONSTRAINT `FKtrd6335blsefl2gxpb8lr0gr7` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wishlist`
--

LOCK TABLES `wishlist` WRITE;
/*!40000 ALTER TABLE `wishlist` DISABLE KEYS */;
INSERT INTO `wishlist` VALUES (3,'2026-05-01 14:31:02.658778',2,11),(4,'2026-05-01 14:31:04.533926',3,11),(5,'2026-05-01 14:31:09.738612',4,11);
/*!40000 ALTER TABLE `wishlist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-05-02 15:01:13
