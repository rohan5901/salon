package com.example.demo.entity;

import java.sql.Time;
import java.time.LocalDate;
import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@Entity
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer clientId;

    private Integer stylistId;

    private Integer startTimeSlotId;

    private Integer endTimeSlotId;

    private LocalDate appointmentDate;

    private LocalDate createdDate;

    private String status = "booked";

    private Integer subCategoryId;
}
