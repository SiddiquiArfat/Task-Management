package com.Task.Task.Controller;

import com.Task.Task.Model.*;

import com.Task.Task.Respository.UserRepository;
import com.Task.Task.Service.UserService;
import com.Task.Task.exception.UserException;
import jakarta.validation.Valid;
import org.hibernate.annotations.SortComparator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
//@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    UserService us;

    @Autowired
    UserRepository ur;

    @GetMapping("/hello")
    public String testHandler() {
        return "Welcome to Spring Security";
    }

    @PostMapping("/signIn")
    public ResponseEntity<String> getLoggedInCustomerDetailsHandler(Authentication auth){
        System.out.println(auth); // this Authentication object having Principle object details
        TaskUser customer= ur.findByUsername(auth.getName()).orElseThrow(()-> new UserException("User Not Found"));
        return new ResponseEntity<>(customer.getName()+"Logged In Successfully", HttpStatus.ACCEPTED);
    }

    @PostMapping("/AddUser")
    public ResponseEntity<TaskUser> addUser(@RequestBody @Valid TaskUser user) {
        return new ResponseEntity<>(us.addUser(user), HttpStatus.OK);
    }

//    @PostMapping("/signin")
//    public ResponseEntity<TaskUser> signin(@RequestBody @Valid LoginDto dto) {
//        return new ResponseEntity<>(us.login(dto), HttpStatus.OK);
//    }

    @PostMapping("/AddProject/{uid}")
    public ResponseEntity<Project> AddProject(@RequestBody @Valid Project project, @PathVariable("uid") Integer uid) {
        return new ResponseEntity<>(us.addProject(uid, project), HttpStatus.CREATED);
    }

    @PostMapping("/AddTask/{uid}/{pid}")
    public ResponseEntity<Task> AddTask(@RequestBody @Valid Task task, @PathVariable("uid") Integer uid, @PathVariable("pid") Integer pid) {
        return new ResponseEntity<>(us.addTask(uid, pid, task), HttpStatus.CREATED);
    }

    @PatchMapping("/AssigningTask")
    public ResponseEntity<AssignTaskDTO> assignTask(@RequestBody AssignTaskDTO atd) {
        return new ResponseEntity<>(us.assignTask(atd), HttpStatus.OK);
    }

    @GetMapping("/opentask/{uid}")
    public ResponseEntity<List<Task>> getOpenTask(@PathVariable("uid") Integer uid) {
        return new ResponseEntity<>(us.openedTask(uid), HttpStatus.ACCEPTED);
    }

    @PatchMapping("/closetask")
    public ResponseEntity<Task> closetask(@RequestBody AssignTaskDTO dto) {
        return new ResponseEntity<>(us.closeTask(dto), HttpStatus.ACCEPTED);
    }

    @GetMapping("/projects/{uid}")
    public ResponseEntity<List<Project>> getAllProject(@PathVariable("uid") Integer uid){
        return new ResponseEntity<>(us.getALlProject(uid), HttpStatus.OK);
    }
}
