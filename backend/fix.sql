USE E_Commerce;

-- Delete duplicate category
DELETE FROM categories WHERE category_id = 2;

-- Update Product Images
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=400&auto=format&fit=crop' WHERE product_id = 1;
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=400&auto=format&fit=crop' WHERE product_id = 2;
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?q=80&w=400&auto=format&fit=crop' WHERE product_id = 3;
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400&auto=format&fit=crop' WHERE product_id = 4;
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop' WHERE product_id = 5;
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=400&auto=format&fit=crop' WHERE product_id = 6;
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=400&auto=format&fit=crop' WHERE product_id = 7;
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=400&auto=format&fit=crop' WHERE product_id = 8;
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=400&auto=format&fit=crop' WHERE product_id = 9;
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1542272604-787c3835535d?q=80&w=400&auto=format&fit=crop' WHERE product_id = 10;
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=400&auto=format&fit=crop' WHERE product_id = 11;
UPDATE products SET image_url = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400&auto=format&fit=crop' WHERE product_id = 12;
