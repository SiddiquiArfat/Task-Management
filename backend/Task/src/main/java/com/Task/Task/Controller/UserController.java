package com.Task.Task.Controller;

import com.Task.Task.Model.*;

import com.Task.Task.Respository.UserRepository;
import com.Task.Task.Service.UserService;
import com.Task.Task.exception.UserException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import org.hibernate.annotations.SortComparator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@RestController
//@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    UserService us;

    @Autowired
    UserRepository ur;

//    @Autowired
//    private ObjectMapper objectMapper;


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

    @PostMapping("/AddProject")
    public ResponseEntity<Project> AddProject(@RequestBody @Valid Project project, Principal principal) {
        String name = principal.getName();
        return new ResponseEntity<>(us.addProject(name, project), HttpStatus.CREATED);
    }

    @PostMapping("/AddTask/{pname}")
    public ResponseEntity<Task> AddTask(@RequestBody @Valid Task task, Principal principal, @PathVariable("pname") String pname) {
        return new ResponseEntity<>(us.addTask(principal.getName(), pname, task), HttpStatus.CREATED);
    }

    @PatchMapping("/AssigningTask")
    public ResponseEntity<AssignTaskDTO> assignTask(@RequestBody AssignTaskDTO atd) {
        return new ResponseEntity<>(us.assignTask(atd), HttpStatus.OK);
    }

    @GetMapping("/opentask")
    public ResponseEntity<List<Task>> getOpenTask(Principal principal) {
        return new ResponseEntity<>(us.openedTask(principal.getName()), HttpStatus.ACCEPTED);
    }

    @GetMapping("/closedtask")
    public ResponseEntity<List<Task>> getCloseTask(Principal principal) {
        return new ResponseEntity<>(us.closedTask(principal.getName()), HttpStatus.ACCEPTED);
    }

    @PatchMapping("/closetask")
    public ResponseEntity<Task> closetask(@RequestBody AssignTaskDTO dto) {
        return new ResponseEntity<>(us.closeTask(dto), HttpStatus.ACCEPTED);
    }

    @GetMapping("/projects")
    public ResponseEntity<List<Project>> getAllProject(Principal user){
        String name = user.getName();
        return new ResponseEntity<>(us.getALlProject(name), HttpStatus.OK);
    }

    @GetMapping("/getproject/{pid}")
    public ResponseEntity<Project> getByIdProject(Principal principal, @PathVariable("pid") Integer pid) {
        return new ResponseEntity<>(us.getProjectByProject(principal.getName(), pid), HttpStatus.OK);
    }

    @GetMapping("/completedproject")
    public ResponseEntity<List<Project>> getCompletedProject(Principal principal){
        return new ResponseEntity<>(us.getAllcompletedProject(principal.getName()), HttpStatus.OK);
    }

    @GetMapping("/completednotproject")
    public ResponseEntity<List<Project>> getNotCompletedProject(Principal principal){
        return new ResponseEntity<>(us.getAllNotCompletedProject(principal.getName()), HttpStatus.OK);
    }

    @GetMapping("/getDueProject")
    public ResponseEntity<List<Project>> getDueProject(Principal principal){
        return new ResponseEntity<>(us.getALlDueProjects(principal.getName()), HttpStatus.OK);
    }

    @PutMapping("/updateproject/{pid}")
    public ResponseEntity<Project> updateProject(@RequestBody ProjectDTO projectDTO,@PathVariable("pid") Integer pid){
        return new ResponseEntity<>(us.updateProject(projectDTO, pid), HttpStatus.OK);
    }

    @DeleteMapping("/deleteproject/{pid}")
    public ResponseEntity<String> deleteProject(@PathVariable("pid") Integer pid){
        return new ResponseEntity<>(us.deleteProject(pid), HttpStatus.OK);
    }

    @PatchMapping("/completeproject/{pid}")
    public ResponseEntity<Project> markAsCompleteProject(Principal principal,@PathVariable("pid") Integer pid){
        return new ResponseEntity<>(us.markAsCompleted(principal.getName(), pid), HttpStatus.OK);
    }

    @PatchMapping("/progressproject/{pid}")
    public ResponseEntity<Project> markAsNotCompleteProject(Principal principal,@PathVariable("pid") Integer pid){
        return new ResponseEntity<>(us.markAsProgress(principal.getName(), pid), HttpStatus.OK);
    }

    @PatchMapping("/assignproject")
    public ResponseEntity<TaskUser> assignProject(@RequestBody AssignTaskDTO dto,Principal principal){
        return new ResponseEntity<>(us.addUserToProject(principal.getName(), dto), HttpStatus.OK);
    }


//    image upload

    @PostMapping("/upload")
    public String handleFileUpload(@RequestParam("file") MultipartFile file, Principal principal) throws IOException {
        TaskUser user = ur.findByUsername(principal.getName()).orElseThrow(()-> new UserException("User Not Found"));
        user.setProfileImage(file.getBytes());
        ur.save(user);
        return "redirect:/profile";
    }

    @GetMapping("/profile-image")
    public void getImageAsByteArray(Principal principal, HttpServletResponse response) throws IOException {
        TaskUser user = ur.findByUsername(principal.getName()).orElseThrow(() -> new UserException("User Not Found"));
        byte[] profileImage = user.getProfileImage();
        if (profileImage != null) {
            response.setContentType("image/jpeg"); // Set the appropriate content type
            response.getOutputStream().write(profileImage);
        }
    }

    @GetMapping("/tasks")
    public ResponseEntity<List<Task>> getAllTask(Principal principal){

        return new ResponseEntity<>(us.getAllTasks(principal.getName()), HttpStatus.OK);
    }


    @GetMapping("/userproject/{tid}")
    public ResponseEntity<Project> getdetailstask(Principal principal,@PathVariable("tid") Integer tid) throws JsonProcessingException {
        Project project = us.getUserProject(principal.getName(), tid);

//        ignoring
        ObjectMapper om = new ObjectMapper();
        om.addMixIn(Project.class, ProjectMixin.class);
        String str = om.writeValueAsString(project);
        Project deserializedProject = om.readValue(str, Project.class);
        deserializedProject.setLdt(project.getLdt());
        deserializedProject.setCompletedDate(project.getCompletedDate());
        return new ResponseEntity<>(deserializedProject, HttpStatus.OK);
    }

    @GetMapping("/Task/{tid}")
    public ResponseEntity<Task> getTaskById(Principal principal,@PathVariable("tid") Integer tid){
        return new ResponseEntity<>(us.getTaskById(principal.getName(),tid), HttpStatus.OK);
    }

    @PutMapping("/updateTask/{tid}")
    public ResponseEntity<Task> updatetask(Principal principal,@RequestBody ProjectDTO projectDTO, @PathVariable("tid") Integer tid){
        return new ResponseEntity<>(us.updateTask(principal.getName(), tid, projectDTO), HttpStatus.OK);
    }

    @DeleteMapping("/deleteTask/{tid}")
    public ResponseEntity<String> deletetask(Principal principal, @PathVariable("tid") Integer tid){
        return new ResponseEntity<>(us.deleteTaskByid(principal.getName(), tid), HttpStatus.OK);
    }

    @PatchMapping("/TaskOpen/{tid}")
    public ResponseEntity<Task> openntask(Principal principal, @PathVariable("tid") Integer tid){
        return new ResponseEntity<>(us.openTask(principal.getName(), tid), HttpStatus.OK);
    }
    @PatchMapping("/TaskClose/{tid}")
    public ResponseEntity<Task> closeetask(Principal principal, @PathVariable("tid") Integer tid){
        return new ResponseEntity<>(us.closesTask(principal.getName(), tid), HttpStatus.OK);
    }

    @GetMapping("/profile")
    public ResponseEntity<TaskUser> profile(Principal principal){
        return new ResponseEntity<>(us.searchByUsername(principal.getName()), HttpStatus.OK);
    }
    @GetMapping("/profile/{username}")
    public ResponseEntity<TaskUser> uprofile(@PathVariable("username") String username){
        return new ResponseEntity<>(us.searchByUsername(username), HttpStatus.OK);
    }

    @GetMapping("/followers")
    public ResponseEntity<List<TaskUser>> follwers(Principal principal){
        return new ResponseEntity<>(us.getFollowers(principal.getName()), HttpStatus.OK);
    }
    @GetMapping("/following")
    public ResponseEntity<List<TaskUser>> following(Principal principal){
        return new ResponseEntity<>(us.getFollowing(principal.getName()), HttpStatus.OK);
    }

    @GetMapping("/followers/{username}")
    public ResponseEntity<List<TaskUser>> userfollwers(@PathVariable String username){
        return new ResponseEntity<>(us.getFollowers(username), HttpStatus.OK);
    }
    @GetMapping("/following/{username}")
    public ResponseEntity<List<TaskUser>> userfollowing(@PathVariable String username){
        return new ResponseEntity<>(us.getFollowing(username), HttpStatus.OK);
    }

    @PatchMapping("/updateuser")
    public ResponseEntity<TaskUser> updateUser(Principal principal, @RequestBody UserDto userDto){
        return new ResponseEntity<>(us.updateUser(principal.getName(), userDto), HttpStatus.OK);
    }

    @GetMapping("/getAllUser")
    public ResponseEntity<List<TaskUser>> getAllUser(Principal principal) throws JsonProcessingException {

        List<TaskUser> user = us.people(principal.getName());
        List<TaskUser> user2 = new ArrayList<>();


        for(TaskUser u: user){
            ObjectMapper om = new ObjectMapper();
            om.addMixIn(TaskUser.class, UserMixin.class);
            String str = om.writeValueAsString(u);
            TaskUser deserializedProject = om.readValue(str, TaskUser.class);
            user2.add(deserializedProject);
        }

        return new ResponseEntity<>(user2, HttpStatus.OK);
    }

    @PatchMapping("/follow/{uid}")
    public ResponseEntity<TaskUser> follow(Principal principal, @PathVariable("uid") Integer uid){
        return new ResponseEntity<>(us.follow(principal.getName(), uid), HttpStatus.OK);
    }

    @PatchMapping("/unfollow/{uid}")
    public ResponseEntity<TaskUser> unfollow(Principal principal, @PathVariable("uid") Integer uid){
        return new ResponseEntity<>(us.unfollow(principal.getName(), uid), HttpStatus.OK);
    }

    @GetMapping("/check/{uid}")
    public ResponseEntity<Boolean> check(Principal principal, @PathVariable("uid") Integer uid){
        return new ResponseEntity<>(us.check(principal.getName(), uid), HttpStatus.OK);
    }
}