package com.vibgyor.ecommerce.repository;

import com.vibgyor.ecommerce.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Integer> {
    List<Product> findByStatus(String status);
    List<Product> findByCategory_CategoryId(Integer categoryId);
}
