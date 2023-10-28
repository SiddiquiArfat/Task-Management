package com.Task.Task.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class TaskUser {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Size(min = 4, max = 14, message = "Name contain character between 4 and 14")
    String name;

    @Column(unique = true)
    @Email(message = "Email Should be in proper format")
    String username;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String password;



    @NotNull(message = "Please Select Role")
    @NotBlank(message = "Please Select Role")
    String role;

    @Lob
    @Column(length = 3145728) // 3 * 1024 * 1024 bytes for 3 MB
    private byte[] profileImage;


    @JsonIgnore
    @ManyToMany(mappedBy = "followers")
    List<TaskUser> following = new ArrayList<>();



    @JsonIgnore
    @ManyToMany
    List<TaskUser> followers = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    List<Task> assignedTasks = new ArrayList<>();

    String bio;

    @JsonIgnore
    @ManyToMany(mappedBy = "user", cascade = CascadeType.ALL)
    List<Project> project = new ArrayList<>();


}
