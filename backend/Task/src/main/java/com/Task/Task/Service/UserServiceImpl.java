package com.Task.Task.Service;

import com.Task.Task.Model.*;

import com.Task.Task.Respository.ContactRepository;
import com.Task.Task.Respository.ProjectRepository;
import com.Task.Task.Respository.TaskRepository;
import com.Task.Task.Respository.UserRepository;
import com.Task.Task.exception.ProjectException;
import com.Task.Task.exception.TaskException;
import com.Task.Task.exception.UserException;
import com.Task.Task.util.*;
import io.swagger.v3.oas.models.info.Contact;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;


@Service
public class UserServiceImpl  implements UserService{

    @Autowired
    UserRepository ur;
    @Autowired
    ProjectRepository pr;
    @Autowired
    TaskRepository tr;
    @Autowired
    PasswordEncoder pe;
    @Autowired
    private OtpUtil otpUtil;
    @Autowired
    private EmailUtil emailUtil;

    @Override
    public TaskUser addUser(TaskUser user) {
        String otp = otpUtil.generateOtp();
        try {
            emailUtil.sendOtpEmail(user.getUsername(), otp);
        } catch (MessagingException e) {
            throw new RuntimeException("Unable to send otp please try again");
        }
        Optional<TaskUser> opt = ur.findByUsername(user.getUsername());
        if(opt.isPresent()) throw new UserException("User Already Exist with this Email");
        user.setOtp(otp);
        user.setOtpGeneratedTime(LocalDateTime.now());
        user.setPassword(pe.encode(user.getPassword()));
        return ur.save(user);
    }

    @Override
    public TaskUser verifyAccount(String email, String otp) {
        TaskUser user  = ur.findByUsername(email)
                .orElseThrow(() -> new RuntimeException("User not found with this email: " + email));
        if (user.getOtp().equals(otp) && Duration.between(user.getOtpGeneratedTime(),
                LocalDateTime.now()).getSeconds() < (1 * 60)) {
            user.setActive(true);
            return  ur.save(user);

        }
        throw new UserException("Please regenerate otp and try again");
    }

    @Override
    public TaskUser regenerateOtp(String email) {
        TaskUser user = ur.findByUsername(email)
                .orElseThrow(() -> new RuntimeException("User not found with this email: " + email));
        String otp = otpUtil.generateOtp();
        try {
            emailUtil.sendOtpEmail(email, otp);
        } catch (MessagingException e) {
            throw new RuntimeException("Unable to send otp please try again");
        }
        user.setOtp(otp);
        user.setOtpGeneratedTime(LocalDateTime.now());
        return ur.save(user);

    }

    @Override
    public Project addProject(String username, Project project) {

        TaskUser user = ur.findByUsername(username).orElseThrow(()-> new UserException("User Not Found"));
        project.setAdmin(user);
        List<TaskUser> users = project.getUser();
        users.add(user);
        List<Project> projects = pr.findAll();

        Optional<Project> project1 = projects.stream().filter(h -> h.getProjectName().equalsIgnoreCase(project.getProjectName())).findAny();
        if (project1.isPresent()) throw new ProjectException("Porject Already Exist with this name");
        projects.add(project);
        ur.save(user);
        return pr.save(project);
    }

    @Override
    public Task addTask(String username, String pname, Task task) {
        TaskUser user = ur.findByUsername(username).orElseThrow(()-> new UserException("User Not Found"));
        Project project = pr.findByProjectName(pname).orElseThrow(()->new ProjectException("Project Not Found"));
        List<Task> tasks = project.getTasks();
        tasks.add(task);
        task.setProject(project);
        task.setUser(user);
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
    public List<Task> getAllTasks(String username) {
        TaskUser user = ur.findByUsername(username).orElseThrow(()->new UserException("User not Found"));
        List<Task> tasks = user.getAssignedTasks();
        if(tasks.isEmpty()) throw new TaskException("No Current Tasks");
        return tasks;
    }

    @Override
    public List<Task> openedTask(String username) {
        TaskUser user = ur.findByUsername(username).orElseThrow(()->new UserException("User not Found"));
        List<Task> tasks = user.getAssignedTasks();
        if(tasks.isEmpty()) throw new TaskException("No Current Tasks");
        List<Task> tasks1 = tasks.stream().filter(h -> h.getStatus().equals("OPEN")).toList();
        if(tasks1.isEmpty()) throw new TaskException("No Open Current Tasks");
        return tasks1;
    }

    @Override
    public List<Task> closedTask(String username) {
        TaskUser user = ur.findByUsername(username).orElseThrow(()->new UserException("User not Found"));
        List<Task> tasks = user.getAssignedTasks();
        if(tasks.isEmpty()) throw new TaskException("No Current Tasks");
        List<Task> tasks1 = tasks.stream().filter(h -> h.getStatus().equals("CLOSE")).toList();
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
    public List<Project> getAllProjects(String username) {
        TaskUser user = ur.findByUsername(username).orElseThrow(()->new UserException("User not Found"));
        List<Project> projects = user.getProject();
        if(projects.isEmpty()) throw new ProjectException("No Projects Found");
        return projects;
    }

    @Override
    public TaskUser searchByUsername(String username) {
        return ur.findByUsername(username).orElseThrow(()-> new UserException("User Not Found"));
    }

    @Override
    public TaskUser login(LoginDto dto) {
        TaskUser user = ur.findByUsername(dto.getUsername()).orElseThrow(()-> new UserException("User Not Found"));

        if(!dto.getPassword().equals(user.getPassword())){
            throw new UserException("Password Incorrect");
        }

        return user;
    }

    @Override
    public List<Project> getALlProject(String username) {
        TaskUser user = ur.findByUsername(username).orElseThrow(()-> new UserException("User Not found"));
        List<Project> projects = user.getProject();
        if(projects.isEmpty()) throw new ProjectException("Don't Have any project history");
        return projects;
    }

    @Override
    public Project getProjectByProject(String username, Integer pid) {
        TaskUser user = ur.findByUsername(username).orElseThrow(()-> new UserException("User Not found"));
        List<Project> projects = user.getProject();
        if(projects.isEmpty()) throw new ProjectException("Don't Have any project history");
        return projects.stream().filter(h -> Objects.equals(h.getId(), pid)).findAny().orElseThrow(()-> new ProjectException("Project Not found"));
    }

    @Override
    public List<Project> getAllcompletedProject(String username) {
        TaskUser user = ur.findByUsername(username).orElseThrow(()-> new UserException("User Not found"));
        List<Project> projects = user.getProject();
        if(projects.isEmpty()) throw new ProjectException("Don't Have any project history");
        return projects.stream().filter(h-> h.isCompleted()).toList();
    }

    @Override
    public List<Project> getAllNotCompletedProject(String username) {
        TaskUser user = ur.findByUsername(username).orElseThrow(()-> new UserException("User Not found"));
        List<Project> projects = user.getProject();
        if(projects.isEmpty()) throw new ProjectException("Don't Have any project history");
        return projects.stream().filter(h-> !h.isCompleted()).toList();
    }

    @Override
    public List<Project> getALlDueProjects(String username) {
        TaskUser user = ur.findByUsername(username).orElseThrow(()-> new UserException("User Not found"));
        List<Project> projects = user.getProject();
        if(projects.isEmpty()) throw new ProjectException("Don't Have any project history");
        return projects.stream().filter(h-> !h.isCompleted()).filter(h-> h.getCompletedDate()!=null).filter(h->  h.getCompletedDate().isBefore(LocalDate.now())).toList();
    }

    @Override
    public Project updateProject(ProjectDTO projectD,Integer pid) {

        Project project = pr.findById(pid).orElseThrow(()-> new ProjectException("Project Not Found"));
        String name = projectD.getName();
        String about = projectD.getAbout();
        LocalDate deadline = projectD.getDeadline();

        project.setProjectName(name);
        project.setAbout(about);

        project.setCompletedDate(deadline);
        return pr.save(project);
    }

    @Override
    public String deleteProject(Integer pid) {

        pr.deleteById(pid);
        return "Project Deleted";
    }

    @Override
    public Project markAsCompleted(String username, Integer pid) {
        TaskUser user = ur.findByUsername(username).orElseThrow(()->new UserException("User Not Found"));
        List<Project> projects= user.getProject();
        Project project = projects.stream().filter(h-> Objects.equals(h.getId(), pid)).findAny().orElseThrow(()-> new ProjectException("Project Not found"));
        project.setCompleted(true);
        return pr.save(project);
    }

    @Override
    public Project markAsProgress(String username, Integer pid) {
        TaskUser user = ur.findByUsername(username).orElseThrow(()->new UserException("User Not Found"));
        List<Project> projects= user.getProject();
        Project project = projects.stream().filter(h-> Objects.equals(h.getId(), pid)).findAny().orElseThrow(()-> new ProjectException("Project Not found"));
        project.setCompleted(false);
        return pr.save(project);
    }

    @Override
    public TaskUser addUserToProject(String username, AssignTaskDTO asd) {
        TaskUser user = ur.findByUsername(username).orElseThrow(()->new UserException("User Not Found"));
        List<Project> projects= user.getProject();

        Integer pid = asd.getProjectId();
        Project project = projects.stream().filter(h-> Objects.equals(h.getId(), pid)).findAny().orElseThrow(()-> new ProjectException("Project Not found"));

        List<TaskUser> users = project.getUser();

        Optional<TaskUser> validation = users.stream().filter(h-> h.getUsername().equals(asd.getUsername())).findAny();

        if(validation.isPresent()) throw new UserException("User Already Exists");

        TaskUser finduser = ur.findByUsername(asd.getUsername()).orElseThrow(()->new UserException("User Not Found"));
        users.add(finduser);
        project.setUser(users);
        List<Project> projects1 = finduser.getProject();
        projects1.add(project);
        finduser.setProject(projects1);
        pr.save(project);
        return ur.save(finduser);
    }

    @Override
    public Project getUserProject(String username, Integer tid) {
        TaskUser user = ur.findByUsername(username).orElseThrow(()->new UserException("User Not Found"));
        Task task = user.getAssignedTasks().stream().filter(h-> Objects.equals(h.getId(), tid)).findAny().orElseThrow(()-> new TaskException("Task Not Found"));

        Project project = task.getProject();

        return project;
    }

    @Override
    public Task getTaskById(String username, Integer tid) {
        TaskUser user = ur.findByUsername(username).orElseThrow(()->new UserException("User Not Found"));
        Task task = user.getAssignedTasks().stream().filter(h-> Objects.equals(h.getId(), tid)).findAny().orElseThrow(()-> new TaskException("Task Not Found"));
        return task;
    }

    @Override
    public Task updateTask(String username, Integer tid, ProjectDTO projectDTO) {
        TaskUser user = ur.findByUsername(username).orElseThrow(()->new UserException("User Not Found"));
        Task task = user.getAssignedTasks().stream().filter(h-> Objects.equals(h.getId(), tid)).findAny().orElseThrow(()-> new TaskException("Task Not Found"));
        task.setTaskName(projectDTO.getName());
        task.setAbout(projectDTO.getAbout());
        task.setClosed(projectDTO.getDeadline());
        return tr.save(task);
    }

    @Override
    public String deleteTaskByid(String username, Integer tid) {
        tr.deleteById(tid);
        return "Task Deleted";
    }

    @Override
    public Task openTask(String username, Integer tid) {
        TaskUser user = ur.findByUsername(username).orElseThrow(()->new UserException("User Not Found"));
        Task task = user.getAssignedTasks().stream().filter(h-> Objects.equals(h.getId(), tid)).findAny().orElseThrow(()-> new TaskException("Task Not Found"));
        task.setStatus("OPEN");
        task.setTimestamp(null);
        return tr.save(task);
    }

    @Override
    public Task closesTask(String username, Integer tid) {
        TaskUser user = ur.findByUsername(username).orElseThrow(()->new UserException("User Not Found"));
        Task task = user.getAssignedTasks().stream().filter(h-> Objects.equals(h.getId(), tid)).findAny().orElseThrow(()-> new TaskException("Task Not Found"));
        task.setStatus("CLOSE");
        task.setTimestamp(LocalDateTime.now());
        return tr.save(task);
    }

    @Override
    public List<TaskUser> getFollowers(String username) {
        TaskUser user = ur.findByUsername(username).orElseThrow(()->new UserException("User Not Found"));
        return user.getFollowers();
    }

    @Override
    public List<TaskUser> getFollowing(String username) {

        TaskUser user = ur.findByUsername(username).orElseThrow(()->new UserException("User Not Found"));
        return user.getFollowing();
    }

    @Override
    public TaskUser updateUser(String username, UserDto userDto) {
        TaskUser user = ur.findByUsername(username).orElseThrow(()->new UserException("User Not Found"));
        user.setName(userDto.getName());
        user.setBio(userDto.getBio());
        return ur.save(user);
    }

    @Override
    public List<TaskUser> people(String username) {
        TaskUser cuser = ur.findByUsername(username).orElseThrow(()->new UserException("User Not Found"));
        List<TaskUser> users = ur.findAll();
        List<TaskUser> st = users.stream().filter(h-> !h.getUsername().equals(username)).toList();



        return st;
    }

    @Override
    public TaskUser unfollow(String username, Integer uid) {
        TaskUser user = ur.findById(uid).orElseThrow(()-> new UserException("User Not Found") );
        TaskUser cuser = ur.findByUsername(username).orElseThrow(()->new UserException("User Not Found"));
        List<TaskUser> following = cuser.getFollowing();
        following.remove(user);
        cuser.setFollowing(following);

        List<TaskUser> follower = user.getFollowers();
        follower.remove(cuser);
        user.setFollowers(follower);
        ur.save(user);
        return ur.save(cuser);
    }

    @Override
    public TaskUser follow(String username, Integer uid) {
        TaskUser user = ur.findById(uid).orElseThrow(()-> new UserException("User Not Found") );
        TaskUser cuser = ur.findByUsername(username).orElseThrow(()->new UserException("User Not Found"));
        List<TaskUser> following = cuser.getFollowing();
        following.add(user);
        cuser.setFollowing(following);
        List<TaskUser> follower = user.getFollowers();
        follower.add(cuser);
        user.setFollowers(follower);
        ur.save(user);
        return ur.save(cuser);
    }

    @Override
    public Boolean check(String username, Integer uid) {
        TaskUser user = ur.findById(uid).orElseThrow(()-> new UserException("User Not Found") );
        List<TaskUser> followers = user.getFollowers();
        Optional<TaskUser> tuser = followers.stream().filter(h-> h.getUsername().equals(username)).findAny();
        return tuser.isPresent();
    }

    @Override
    public List<TaskUser> getSearchName(String name) {
        List<TaskUser> users = ur.findByNameContaining(name);
        return users;
    }

    @Override
    public List<Project> getSearchProject(String name, String username) {
        TaskUser user = ur.findByUsername(username).orElseThrow(()-> new UserException("User Not Found") );
        List<Project> project = pr.findByProjectNameContaining(name);
        List<Project> project1 = new ArrayList<>();
        for(Project p: project){
            List<TaskUser> users = p.getUser();
            boolean j = users.stream().anyMatch(h-> h.getUsername().equals(username));
            if (j){
                project1.add(p);
            }
        }
        return project1;
    }

    @Override
    public List<Task> getSearchTask(String name, String username) {
        List<Task> task = tr.findByTaskNameContaining(name);
        List<Task> task1 = new ArrayList<>();
        for (Task t: task){
            if (t.getUser().getUsername().equals(username)){
                task1.add(t);
            }
        }
        return task1;
    }

//    contact
    @Autowired
    ContactRepository cr;
    @Override
    public ContactPage sendContact(ContactPage contact) {
        return cr.save(contact);
    }


}
