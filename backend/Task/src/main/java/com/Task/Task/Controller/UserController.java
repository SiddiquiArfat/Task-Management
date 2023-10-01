package com.Task.Task.Controller;

import com.Task.Task.Model.AssignTaskDTO;
import com.Task.Task.Model.Project;
import com.Task.Task.Model.Task;
import com.Task.Task.Model.TaskUser;

import com.Task.Task.Service.UserService;
import jakarta.validation.Valid;
import org.hibernate.annotations.SortComparator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


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

    @PatchMapping("/AssigningTask")
    public ResponseEntity<AssignTaskDTO> assignTask(@RequestBody AssignTaskDTO atd){
        return new ResponseEntity<>(us.assignTask(atd), HttpStatus.OK);
    }

    @GetMapping("/opentask/{uid}")
    public ResponseEntity<List<Task>> getOpenTask(@PathVariable("uid") Integer uid){
        return new ResponseEntity<>(us.openedTask(uid),HttpStatus.ACCEPTED);
    }

    @PatchMapping("/closetask")
    public ResponseEntity<Task> closetask(@RequestBody AssignTaskDTO dto){
        return new ResponseEntity<>(us.closeTask(dto),HttpStatus.ACCEPTED);
    }

}
