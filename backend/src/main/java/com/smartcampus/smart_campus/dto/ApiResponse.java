package com.smartcampus.smart_campus.dto;

import lombok.Data;
import lombok.AllArgsConstructor;

@Data
@AllArgsConstructor
public class ApiResponse {
    private boolean success;
    private String message;
}
