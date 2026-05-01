USE E_Commerce;

-- Insert Categories
INSERT INTO categories (category_name, description, status, created_at, updated_at) VALUES 
('Electronics', 'Electronic gadgets and devices', true, NOW(), NOW()),
('Books', 'Physical and digital books', true, NOW(), NOW()),
('Clothing', 'Apparel and accessories', true, NOW(), NOW());

-- Get Category IDs (assuming they are 1, 2, 3 or newly auto-incremented, but we can use subqueries)
SET @cat_electronics = (SELECT category_id FROM categories WHERE category_name = 'Electronics' LIMIT 1);
SET @cat_books = (SELECT category_id FROM categories WHERE category_name = 'Books' LIMIT 1);
SET @cat_clothing = (SELECT category_id FROM categories WHERE category_name = 'Clothing' LIMIT 1);

-- Insert Products
INSERT INTO products (name, description, price, stock, status, category_id, image_url, created_at, updated_at) VALUES 
('Smartphone Pro', 'Latest 5G smartphone with 128GB storage', 45000.00, 50, 'Active', @cat_electronics, 'https://picsum.photos/seed/phone/400/300', NOW(), NOW()),
('Wireless Headphones', 'Noise-cancelling wireless headphones', 4500.00, 100, 'Active', @cat_electronics, 'https://picsum.photos/seed/headphones/400/300', NOW(), NOW()),
('Gaming Laptop', 'High-performance gaming laptop with RTX 4060', 95000.00, 20, 'Active', @cat_electronics, 'https://picsum.photos/seed/laptop/400/300', NOW(), NOW()),
('Smartwatch', 'Fitness tracker and smartwatch with heart rate monitor', 3500.00, 75, 'Active', @cat_electronics, 'https://picsum.photos/seed/watch/400/300', NOW(), NOW()),

('The Great Gatsby', 'Classic novel by F. Scott Fitzgerald', 350.00, 200, 'Active', @cat_books, 'https://picsum.photos/seed/book1/400/300', NOW(), NOW()),
('Atomic Habits', 'An Easy & Proven Way to Build Good Habits', 550.00, 150, 'Active', @cat_books, 'https://picsum.photos/seed/book2/400/300', NOW(), NOW()),
('Clean Code', 'A Handbook of Agile Software Craftsmanship', 850.00, 80, 'Active', @cat_books, 'https://picsum.photos/seed/book3/400/300', NOW(), NOW()),
('Dune', 'Science fiction novel by Frank Herbert', 650.00, 120, 'Active', @cat_books, 'https://picsum.photos/seed/book4/400/300', NOW(), NOW()),

('Men''s Cotton T-Shirt', 'Comfortable 100% cotton casual t-shirt', 599.00, 300, 'Active', @cat_clothing, 'https://picsum.photos/seed/tshirt/400/300', NOW(), NOW()),
('Denim Jeans', 'Classic blue denim jeans for men', 1299.00, 150, 'Active', @cat_clothing, 'https://picsum.photos/seed/jeans/400/300', NOW(), NOW()),
('Women''s Floral Dress', 'Summer floral dress for women', 1599.00, 90, 'Active', @cat_clothing, 'https://picsum.photos/seed/dress/400/300', NOW(), NOW()),
('Running Shoes', 'Lightweight running shoes for daily workouts', 2499.00, 110, 'Active', @cat_clothing, 'https://picsum.photos/seed/shoes/400/300', NOW(), NOW());
