package com.example.demo.repository;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.demo.entity.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {
    @Query(value = "SELECT * FROM services.appointment WHERE appointment_date > CAST(?1 AS DATE)", nativeQuery = true)
    List<Appointment> fetchBookedSlots(@Param("filterDate") LocalDate filterDate);
}
