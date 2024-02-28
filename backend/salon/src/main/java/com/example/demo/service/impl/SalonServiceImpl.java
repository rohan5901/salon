package com.example.demo.service.impl;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.demo.dto.BookAppointmentRequest;
import com.example.demo.entity.Appointments;
import com.example.demo.repository.AppointmentRepository;
import com.example.demo.service.SalonService;

@Service
public class SalonServiceImpl implements SalonService {
    @Autowired
    private AppointmentRepository appointmentRepository;

    public Object bookAppointment(BookAppointmentRequest payload) {

        Appointments makeAppointment = new Appointments();
        makeAppointment.setAppointmentDate(payload.getAppointmentDate());
        makeAppointment.setClientId(payload.getClientId());
        makeAppointment.setStylistId(payload.getStylistId());
        makeAppointment.setStartTimeSlotId(payload.getStartTimeSlotId());
        makeAppointment.setEndTimeSlotId(payload.getEndTimeSlotId());
        makeAppointment.setCreatedDate(new Date());

        return appointmentRepository.save(makeAppointment);
    }

    public Object bookedSlots(String currentDate) {
        return appointmentRepository.fetchBookedSlots(currentDate);
    }
}
