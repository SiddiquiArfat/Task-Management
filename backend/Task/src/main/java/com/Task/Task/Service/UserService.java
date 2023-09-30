package com.Task.Task.Service;

import com.Task.Task.Model.Project;
import com.Task.Task.Model.Task;
import com.Task.Task.Model.TaskUser;

import org.springframework.stereotype.Service;


public interface UserService {
    public TaskUser addUser(TaskUser user);
    public Project addProject(Integer uid, Project project);
    public Task addTask(Integer uid, Integer pid, Task task);

    public Task assignTask(Integer uid, Integer pid, Integer tid);
}
