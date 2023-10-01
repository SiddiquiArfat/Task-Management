package com.Task.Task.Service;

import com.Task.Task.Model.AssignTaskDTO;
import com.Task.Task.Model.Project;
import com.Task.Task.Model.Task;
import com.Task.Task.Model.TaskUser;

import java.util.List;


public interface UserService {
    public TaskUser addUser(TaskUser user);
    public Project addProject(Integer uid, Project project);
    public Task addTask(Integer uid, Integer pid, Task task);

//    public Task assignTask(Integer uid, Integer pid, Integer tid);

    public AssignTaskDTO assignTask(AssignTaskDTO dto);
    public List<Task> getAllTasks(Integer uid);

    public List<Task> openedTask(Integer uid);
    public List<Task> closedTask(Integer uid);

    public Task closeTask(AssignTaskDTO dto);

    Task openTask(AssignTaskDTO dto);

    public List<Project> getAllProjects(Integer uid);

    public TaskUser searchByUsername(String username);



}
