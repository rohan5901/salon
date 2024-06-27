package com.example.demo.service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.example.demo.dto.BookAppointmentRequest;
import com.example.demo.dto.NonAvailableSlotsRequest;
import com.example.demo.entity.Appointment;

public interface SalonService {
    Object bookAppointment(BookAppointmentRequest payload);

    List<Appointment> bookedSlots(LocalDate currentDate);

    Map<LocalDate, Set<Integer>> getNonAvailableSlots(NonAvailableSlotsRequest payload) throws Exception;

    Map<LocalDate, Object> getAvailableSlots();

}
