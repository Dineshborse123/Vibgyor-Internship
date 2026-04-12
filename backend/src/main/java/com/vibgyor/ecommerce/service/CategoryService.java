package com.vibgyor.ecommerce.service;

import com.vibgyor.ecommerce.model.Category;
import com.vibgyor.ecommerce.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    public Category createCategory(Category category) {
        return categoryRepository.save(category);
    }

    public List<Category> getAllCategories() {
        return categoryRepository.findAll();
    }

    public Optional<Category> getCategoryById(Integer id) {
        return categoryRepository.findById(id);
    }

    public Category updateCategory(Integer id, Category updatedCategory) {
        return categoryRepository.findById(id).map(category -> {
            category.setCategoryName(updatedCategory.getCategoryName());
            category.setDescription(updatedCategory.getDescription());
            return categoryRepository.save(category);
        }).orElseThrow(() -> new RuntimeException("Category not found with id " + id));
    }

    public Category deactivateCategory(Integer id) {
        return categoryRepository.findById(id).map(category -> {
            // Note: Before deactivating, we should check if products are associated with this category.
            // Since Product is not implemented yet, we leave a placeholder/comment.
            // if(productRepository.countByCategoryIdAndStatusTrue(id) > 0) {
            //    throw new RuntimeException("Warning: Reassign products to a new category before deactivating.");
            // }
            category.setStatus(false);
            return categoryRepository.save(category);
        }).orElseThrow(() -> new RuntimeException("Category not found with id " + id));
    }
}
