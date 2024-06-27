package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.demo.entity.WorkingDay;
import java.util.List;

public interface WorkingDaysRepository extends JpaRepository<WorkingDay, Integer> {
    @Query(value = "SELECT id FROM services.appointment where day=?1;", nativeQuery = true)
    int findbyDay(String dayOfWeek);
}
