package com.Task.Task.Service;

import com.Task.Task.Model.*;
import io.swagger.v3.oas.models.info.Contact;

import java.util.List;


public interface UserService {
    public TaskUser addUser(TaskUser user);

    TaskUser verifyAccount(String email, String otp);

    TaskUser regenerateOtp(String email);

    public Project addProject(String username, Project project);
    public Task addTask(String username, String pname, Task task);

//    public Task assignTask(Integer uid, Integer pid, Integer tid);

    public AssignTaskDTO assignTask(AssignTaskDTO dto);
    public List<Task> getAllTasks(String username);

    public List<Task> openedTask(String username);
    public List<Task> closedTask(String username);

    public Task closeTask(AssignTaskDTO dto);

    Task openTask(AssignTaskDTO dto);

    public List<Project> getAllProjects(String username);

    public TaskUser searchByUsername(String username);

    public TaskUser login(LoginDto dto);

    public List<Project> getALlProject(String username);

    public Project getProjectByProject(String username,Integer pid);

    public List<Project> getAllcompletedProject(String username);

    List<Project> getAllNotCompletedProject(String username);

    List<Project> getALlDueProjects(String username);

    public Project updateProject(ProjectDTO projectD,Integer pid);

    public String deleteProject(Integer pid);

    public Project markAsCompleted(String username, Integer pid);
    public Project markAsProgress(String username, Integer pid);

    public TaskUser addUserToProject(String username, AssignTaskDTO asd);

    public Project getUserProject(String username, Integer tid);

    public Task getTaskById(String username, Integer tid);

    public Task updateTask(String username, Integer tid, ProjectDTO projectDTO);

    public String deleteTaskByid(String username,Integer tid);

    public Task openTask(String username,Integer tid);
    public Task closesTask(String username,Integer tid);

    public List<TaskUser> getFollowers(String username);
    public List<TaskUser> getFollowing(String username);

    public TaskUser updateUser(String username, UserDto userDto);

    public List<TaskUser> people(String username);

    public TaskUser unfollow(String username, Integer uid);
    public TaskUser follow(String username, Integer uid);

    public Boolean check(String username, Integer uid);

    public List<TaskUser> getSearchName(String name);
    public List<Project> getSearchProject(String name, String username);
    public List<Task> getSearchTask(String name, String username);

    public ContactPage sendContact(ContactPage contact);
}
