package com.example.demo.service;

import java.util.Date;

import com.example.demo.dto.BookAppointmentRequest;

public interface SalonService {
    Object bookAppointment(BookAppointmentRequest payload);

    Object bookedSlots(String currentDate);
}
