package com.example.demo.dto;

import java.util.Date;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NonAvailableSlotsRequest {
    // private Date curDate;
    private Integer[] subCategoryIds;
}
