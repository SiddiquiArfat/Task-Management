package com.Task.Task.Controller;

import com.Task.Task.Model.Project;
import com.Task.Task.Model.Task;
import com.Task.Task.Model.TaskUser;

import com.Task.Task.Service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;



@RestController
public class UserController {

    @Autowired
    UserService us;
    @PostMapping("/AddUser")
    public ResponseEntity<TaskUser> addUser(@RequestBody @Valid TaskUser user){
        return new ResponseEntity<>(us.addUser(user), HttpStatus.CREATED);
    }

    @PostMapping("/AddProject/{uid}")
    public ResponseEntity<Project> AddProject(@RequestBody @Valid Project project, @PathVariable("uid") Integer uid){
        return new ResponseEntity<>(us.addProject(uid,project), HttpStatus.CREATED);
    }
    @PostMapping("/AddTask/{uid}/{pid}")
    public ResponseEntity<Task> AddTask(@RequestBody @Valid Task task, @PathVariable("uid") Integer uid, @PathVariable("pid") Integer pid){
        return new ResponseEntity<>(us.addTask(uid, pid, task), HttpStatus.CREATED);
    }

}
