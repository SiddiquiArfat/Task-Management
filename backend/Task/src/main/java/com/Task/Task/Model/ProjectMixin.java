package com.Task.Task.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDate;
import java.util.List;

public abstract class ProjectMixin {
    @JsonIgnore
    abstract TaskUser getAdmin();

    @JsonIgnore
    abstract List<TaskUser> getUser();

    @JsonIgnore
    abstract List<Task> getTasks();

    @JsonIgnore
    abstract LocalDate getLdt();

    @JsonIgnore
    abstract LocalDate getCompletedDate();
}
