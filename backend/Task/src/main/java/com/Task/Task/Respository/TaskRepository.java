package com.Task.Task.Respository;

import com.Task.Task.Model.Task;
import com.Task.Task.Model.TaskUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Integer> {
    public List<Task> findByTaskNameContaining(String str);
}
