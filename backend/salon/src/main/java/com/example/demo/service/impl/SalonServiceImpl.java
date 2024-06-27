package com.example.demo.service.impl;

import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import com.example.demo.dto.BookAppointmentRequest;
import com.example.demo.dto.NonAvailableSlotsRequest;
import com.example.demo.entity.Appointment;
import com.example.demo.entity.TimeSlotMst;
import com.example.demo.entity.WorkingDay;
import com.example.demo.repository.AppointmentRepository;
import com.example.demo.repository.SubCategoryRepository;
import com.example.demo.repository.TimeSlotRepository;
import com.example.demo.repository.WorkingDaysRepository;
import com.example.demo.service.SalonService;

@Service
public class SalonServiceImpl implements SalonService {
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Autowired
    private TimeSlotRepository timeSlotRepository;

    @Autowired
    private SubCategoryRepository subCategoryRepository;

    @Autowired
    WorkingDaysRepository workingDaysRepository;

    private Double unitSlotDurationInMinutes = 30.0;

    public Object bookAppointment(BookAppointmentRequest payload) {

        Appointment makeAppointment = new Appointment();
        makeAppointment.setAppointmentDate(payload.getAppointmentDate());
        makeAppointment.setClientId(payload.getClientId());
        makeAppointment.setStylistId(payload.getStylistId());
        makeAppointment.setStartTimeSlotId(payload.getStartTimeSlotId());
        makeAppointment.setEndTimeSlotId(payload.getEndTimeSlotId());
        makeAppointment.setCreatedDate(LocalDate.now());

        return appointmentRepository.save(makeAppointment);
    }

    public List<Appointment> bookedSlots(LocalDate currentDate) {
        return appointmentRepository.fetchBookedSlots(currentDate);
    }

    @Override
    public Map<LocalDate, Set<Integer>> getNonAvailableSlots(NonAvailableSlotsRequest payload) throws Exception {
        List<Appointment> appointments = appointmentRepository.fetchBookedSlots(LocalDate.now());
        Map<LocalDate, Set<Integer>> nonAvailableSlotsByDate = new HashMap<>();
        Long total_duration = (long) 0;
        for (Integer subCategoryId : payload.getSubCategoryIds()) {
            total_duration += subCategoryRepository.findById(subCategoryId).get().getDurationInMinutes();
        }
        Integer requiredSlots = (int) Math.ceil((double) total_duration / unitSlotDurationInMinutes);
        for (Appointment appointment : appointments) {
            LocalDate appointmentDate = appointment.getAppointmentDate();
            Set<Integer> nonAvailableSlots = nonAvailableSlotsForAppointment(appointment, requiredSlots);
            nonAvailableSlotsByDate.merge(appointmentDate, nonAvailableSlots, (existingSlots, newSlots) -> {
                existingSlots.addAll(newSlots);
                return existingSlots;
            });
        }

        return nonAvailableSlotsByDate;
    }

    private Set<Integer> nonAvailableSlotsForAppointment(Appointment appointment, Integer requiredSlots)
            throws Exception {
        Set<Integer> nonAvailableSlots = new HashSet<>();
        List<TimeSlotMst> timeSlots = timeSlotRepository.findAll();
        LocalDate appointmentDate = appointment.getAppointmentDate();
        String dayOfWeek = appointmentDate.getDayOfWeek().toString();
        int startSlotOfDay = workingDaysRepository.findbyDay(dayOfWeek);
        // +1 because if required slot is 1 only then the previous slot of the starting
        // slot can be booked
        int startSlot = Math.max(startSlotOfDay, appointment.getStartTimeSlotId() - requiredSlots + 1);
        int endSlot = appointment.getEndTimeSlotId();

        for (int i = startSlot; i < appointment.getStartTimeSlotId(); i++) {
            nonAvailableSlots.add(timeSlots.get(i - 1).getId());
        }

        for (int i = appointment.getStartTimeSlotId(); i <= endSlot && i <= timeSlots.size(); i++) {
            nonAvailableSlots.add(timeSlots.get(i - 1).getId());
        }

        return nonAvailableSlots;
    }

    @Override
    public Map<LocalDate, Object> getAvailableSlots() {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAvailableSlots'");
    }
}
