package com.vibgyor.ecommerce.controller;

import com.vibgyor.ecommerce.model.Product;
import com.vibgyor.ecommerce.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "*") // Update in production
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<Product> getActiveProducts(@RequestParam(value = "category_id", required = false) String categoryIdStr) {
        Integer categoryId = null;
        if (categoryIdStr != null && !categoryIdStr.trim().isEmpty() && !categoryIdStr.equals("undefined") && !categoryIdStr.equals("null")) {
            try {
                categoryId = Integer.parseInt(categoryIdStr);
            } catch (NumberFormatException e) {
                // Ignore parsing error, treat as no category filter
            }
        }
        return productService.getActiveProducts(categoryId);
    }

    @GetMapping("/all")
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Integer id) {
        return productService.getProductById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productService.createProduct(product);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable Integer id, @RequestBody Product product) {
        try {
            return ResponseEntity.ok(productService.updateProduct(id, product));
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Integer id) {
        productService.softDeleteProduct(id);
        return ResponseEntity.ok().build();
    }
}
