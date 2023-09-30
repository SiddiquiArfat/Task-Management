package com.Task.Task.exception;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ErrorDetails {

    String message;
    String descritpion;
    LocalDateTime ldt = LocalDateTime.now();
}
