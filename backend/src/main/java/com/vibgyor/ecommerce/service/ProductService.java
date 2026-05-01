package com.vibgyor.ecommerce.service;

import com.vibgyor.ecommerce.model.Product;
import com.vibgyor.ecommerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public List<Product> getActiveProducts(Integer categoryId) {
        List<Product> products = productRepository.findByStatus("Active");
        if (categoryId != null) {
            return products.stream()
                .filter(p -> p.getCategory() != null && p.getCategory().getCategoryId().equals(categoryId))
                .collect(Collectors.toList());
        }
        return products;
    }

    public Optional<Product> getProductById(Integer id) {
        return productRepository.findById(id);
    }

    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    public Product updateProduct(Integer id, Product updatedProduct) {
        return productRepository.findById(id).map(existing -> {
            existing.setName(updatedProduct.getName());
            existing.setDescription(updatedProduct.getDescription());
            existing.setPrice(updatedProduct.getPrice());
            existing.setStock(updatedProduct.getStock());
            if (updatedProduct.getCategory() != null) {
                existing.setCategory(updatedProduct.getCategory());
            }
            if (updatedProduct.getStatus() != null) {
                existing.setStatus(updatedProduct.getStatus());
            }
            return productRepository.save(existing);
        }).orElseThrow(() -> new RuntimeException("Product not found"));
    }

    public void softDeleteProduct(Integer id) {
        productRepository.findById(id).ifPresent(product -> {
            product.setStatus("Inactive");
            productRepository.save(product);
        });
    }
}
