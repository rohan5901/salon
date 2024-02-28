package com.example.demo.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookAppointmentRequest {
    private Integer clientId;
    private Integer stylistId;
    private Integer startTimeSlotId;
    private Integer endTimeSlotId;
    private Date appointmentDate;
}
