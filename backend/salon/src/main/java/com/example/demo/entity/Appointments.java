package com.example.demo.entity;

import java.sql.Time;
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
public class Appointments {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer clientId;

    private Integer stylistId;

    private Integer startTimeSlotId;

    private Integer endTimeSlotId;

    private Date appointmentDate;

    private Date createdDate;

    private String status = "booked";
}
