package com.Task.Task.Service;

import com.Task.Task.Model.Project;
import com.Task.Task.Model.Task;
import com.Task.Task.Model.TaskUser;

import com.Task.Task.Respository.ProjectRepository;
import com.Task.Task.Respository.TaskRepository;
import com.Task.Task.Respository.UserRepository;
import com.Task.Task.exception.ProjectException;
import com.Task.Task.exception.TaskException;
import com.Task.Task.exception.UserException;
import jdk.jshell.spi.ExecutionControl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
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


//    need updated

    @Override
    public Task assignTask(Integer uid, Integer pid, Integer tid) {
        TaskUser user = ur.findById(uid).orElseThrow(()-> new UserException("User Not Found"));
        Project project = pr.findById(pid).orElseThrow(()->new ProjectException("Project Not Found"));
        Task task = tr.findById(tid).orElseThrow(()-> new TaskException("Task Not Found"));
        List<TaskUser> users = project.getUser();
        boolean bool = users.stream().anyMatch(u -> Objects.equals(u.getId(), user.getId()));
        if(bool){
            task.setUser(user);
            List<Task> tasks = user.getAssignedTasks();
            tasks.add(task);
            user.setAssignedTasks(tasks);
            ur.save(user);
            return tr.save(task);
        }
        throw new ProjectException("Project Not Found");
    }


}
