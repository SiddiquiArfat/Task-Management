package com.Task.Task.Model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Size(min = 4, max = 14, message = "Name contain character between 4 and 14")
    String taskName;

    String status = "OPEN";

    LocalDate ldt = LocalDate.now();

    LocalDate closed;

    @ManyToOne(fetch = FetchType.LAZY)
    TaskUser user;

    @ManyToOne(fetch = FetchType.LAZY)
    Project project;

}
