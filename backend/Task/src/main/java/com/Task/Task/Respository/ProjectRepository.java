package com.Task.Task.Respository;

import com.Task.Task.Model.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProjectRepository extends JpaRepository<Project,Integer> {
    public Optional<Project> findByProjectName(String name);
}
