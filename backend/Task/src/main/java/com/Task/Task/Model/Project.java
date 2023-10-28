package com.Task.Task.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column(unique = true)
    @Size(min = 4, max = 17, message = "Project name should be between 4 and 9 Character")
    String projectName;

//    @JsonIgnore
    @ManyToOne
    TaskUser admin;

    String about;

//    @JsonIgnore
    @ManyToMany
    List<TaskUser> user = new ArrayList<>();

//    @JsonIgnore

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL)
    List<Task> tasks = new ArrayList<>();

    LocalDate ldt = LocalDate.now();

    boolean isCompleted = false;

    LocalDate completedDate;

}
