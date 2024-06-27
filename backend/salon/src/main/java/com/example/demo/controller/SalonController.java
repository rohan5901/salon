package com.example.demo.controller;

import org.springframework.web.bind.annotation.RestController;

import com.example.demo.dto.BookAppointmentRequest;
import com.example.demo.dto.NonAvailableSlotsRequest;
import com.example.demo.entity.CategoryMst;
import com.example.demo.entity.SubCategory;
import com.example.demo.repository.CategoryMstRepository;
import com.example.demo.repository.SubCategoryRepository;
import com.example.demo.service.SalonService;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class SalonController {

    @Autowired
    CategoryMstRepository categoryMstRepository;

    @Autowired
    SubCategoryRepository subCategoryRepository;

    @Autowired
    SalonService salonService;

    @PostMapping("/createCategory")
    public List<CategoryMst> createCategories(@RequestBody String[] categoryNameArray) {
        List<CategoryMst> categoryList = new ArrayList();
        for (String category : categoryNameArray) {
            CategoryMst categoryMst = new CategoryMst();
            categoryMst.setCategoryName(category);
            CategoryMst result = categoryMstRepository.save(categoryMst);
            categoryList.add(result);
        }

        return categoryList;
    }

    @PostMapping("/createSubCategory")
    public Boolean createSubCategories(@RequestBody List<String> subCategoryNameArray,
            @RequestParam Integer categoryId) {
        for (String subCategory : subCategoryNameArray) {
            SubCategory subcategoryEntity = new SubCategory();
            subcategoryEntity.setCategoryId(categoryId);
            subcategoryEntity.setSubCategoryName(subCategory);

            subCategoryRepository.save(subcategoryEntity);
        }

        return true;
    }

    @GetMapping("/getAllCategory")
    public List<String> getCategories() {
        return categoryMstRepository.findAll().stream().map(CategoryMst::getCategoryName).toList();
    }

    @PostMapping("bookAppointment")
    public Object makeAppointment(@RequestBody BookAppointmentRequest payload) {
        return salonService.bookAppointment(payload);
    }

    @PostMapping("/getBookedSlots")
    public Object getBookedSlots(@RequestBody LocalDate curDate) {
        return salonService.bookedSlots(curDate);
    }

    @PostMapping("/getNonAvailableSlots")
    public Map<LocalDate, Set<Integer>> getNonAvailableSlots(@RequestBody NonAvailableSlotsRequest payload) {
        try {
            return salonService.getNonAvailableSlots(payload);
        } catch (Exception e) {
            System.out.println("error---------->" + e);
            return null;
        }
    }

    // @PostMapping("getAvailableSlots")
    // public Map<LocalDate, Object> getAvailableSlots() {

    // }

}
