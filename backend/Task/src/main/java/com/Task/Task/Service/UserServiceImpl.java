package com.Task.Task.Service;

import com.Task.Task.Model.AssignTaskDTO;
import com.Task.Task.Model.Project;
import com.Task.Task.Model.Task;
import com.Task.Task.Model.TaskUser;

import com.Task.Task.Respository.ProjectRepository;
import com.Task.Task.Respository.TaskRepository;
import com.Task.Task.Respository.UserRepository;
import com.Task.Task.exception.ProjectException;
import com.Task.Task.exception.TaskException;
import com.Task.Task.exception.UserException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


@Service
public class UserServiceImpl  implements UserService{

    @Autowired
    UserRepository ur;
    @Autowired
    ProjectRepository pr;
    @Autowired
    TaskRepository tr;

    @Override
    public TaskUser addUser(TaskUser user) {
        Optional<TaskUser> opt = ur.findByUsername(user.getUsername());
        if(opt.isPresent()) throw new UserException("User Already Exist with this Email");
        return ur.save(user);
    }

    @Override
    public Project addProject(Integer uid, Project project) {

        TaskUser user = ur.findById(uid).orElseThrow(()-> new UserException("User Not Found"));
        project.setAdmin(user);
        List<TaskUser> users = project.getUser();
        users.add(user);
        List<Project> projects = user.getProject();
        projects.add(project);
        ur.save(user);
        return pr.save(project);
    }

    @Override
    public Task addTask(Integer uid, Integer pid, Task task) {
        TaskUser user = ur.findById(uid).orElseThrow(()-> new UserException("User Not Found"));
        Project project = pr.findById(pid).orElseThrow(()->new ProjectException("Project Not Found"));
        List<Task> tasks = project.getTasks();
        tasks.add(task);
        task.setProject(project);
        return tr.save(task);
    }


    @Override
    public AssignTaskDTO assignTask(AssignTaskDTO dto) {
        TaskUser user = ur.findByUsername(dto.getUsername()).orElseThrow(()->new UserException("User not Found"));
        Task task = tr.findById(dto.getTaskId()).orElseThrow(()->new TaskException("Task Not Found"));
        List<Task> tasks = user.getAssignedTasks();
        tasks.add(task);
        user.setAssignedTasks(tasks);
        task.setUser(user);
        tr.save(task);
        return dto;
    }

    @Override
    public List<Task> getAllTasks(Integer uid) {
        TaskUser user = ur.findById(uid).orElseThrow(()->new UserException("User not Found"));
        List<Task> tasks = user.getAssignedTasks();
        if(tasks.isEmpty()) throw new TaskException("No Current Tasks");
        return tasks;
    }

    @Override
    public List<Task> openedTask(Integer uid) {
        TaskUser user = ur.findById(uid).orElseThrow(()->new UserException("User not Found"));
        List<Task> tasks = user.getAssignedTasks();
        if(tasks.isEmpty()) throw new TaskException("No Current Tasks");
        List<Task> tasks1 = tasks.stream().filter(h -> h.getStatus().equals("OPEN")).toList();
        if(tasks1.isEmpty()) throw new TaskException("No Open Current Tasks");
        return tasks1;
    }

    @Override
    public List<Task> closedTask(Integer uid) {
        TaskUser user = ur.findById(uid).orElseThrow(()->new UserException("User not Found"));
        List<Task> tasks = user.getAssignedTasks();
        if(tasks.isEmpty()) throw new TaskException("No Current Tasks");
        List<Task> tasks1 = tasks.stream().filter(h -> h.getStatus().equals("CLOSED")).toList();
        if(tasks1.isEmpty()) throw new TaskException("No Open Current Tasks");
        return tasks1;
    }

    @Override
    public Task closeTask(AssignTaskDTO dto) {
//        TaskUser user = ur.findByUsername(dto.getUsername()).orElseThrow(()->new UserException("User not Found"));
        Task task = tr.findById(dto.getTaskId()).orElseThrow(()->new TaskException("Task Not Found"));
        task.setStatus("CLOSED");
        task.setClosed(LocalDate.now());
        return tr.save(task);
    }

    @Override
    public Task openTask(AssignTaskDTO dto) {
//        TaskUser user = ur.findByUsername(dto.getUsername()).orElseThrow(()->new UserException("User not Found"));
        Task task = tr.findById(dto.getTaskId()).orElseThrow(()->new TaskException("Task Not Found"));
        task.setStatus("OPEN");
        task.setClosed(null);
        return tr.save(task);
    }


    @Override
    public List<Project> getAllProjects(Integer uid) {
        TaskUser user = ur.findById(uid).orElseThrow(()->new UserException("User not Found"));
        List<Project> projects = user.getProject();
        if(projects.isEmpty()) throw new ProjectException("No Projects Found");
        return projects;
    }

    @Override
    public TaskUser searchByUsername(String username) {
        return ur.findByUsername(username).orElseThrow(()-> new UserException("User Not Found"));
    }

    public TaskUser follow(Integer uid, AssignTaskDTO dto){

        TaskUser user = ur.findByUsername(dto.getUsername()).orElseThrow(()-> new UserException("User Not Found"));


    }

}
