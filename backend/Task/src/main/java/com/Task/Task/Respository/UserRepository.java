package com.Task.Task.Respository;

import com.Task.Task.Model.TaskUser;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<TaskUser, Integer> {

    public Optional<TaskUser> findByUsername(String username);
    public List<TaskUser> findByNameContaining(String str);
}
