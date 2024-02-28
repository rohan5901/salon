package com.example.demo.repository;

import java.util.Date;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.Appointments;

public interface AppointmentRepository extends JpaRepository<Appointments, Integer> {
    @Query(value = "SELECT * FROM services.appointments WHERE appointment_date > CAST(?1 AS DATE)", nativeQuery = true)
    Object fetchBookedSlots(@Param("filterDate") String filterDate);
}
