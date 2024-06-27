package com.example.demo.dto;

import java.time.LocalDate;
import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NonAvailableSlotsResponse {
    private LocalDate appointmentDate;
    private Integer[] nonAvailableSlots;
}
