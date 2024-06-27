package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.demo.entity.SubCategory;
import java.util.List;

public interface SubCategoryRepository extends JpaRepository<SubCategory, Integer> {
    // List<SubCategory> findById(Integer id);
}
