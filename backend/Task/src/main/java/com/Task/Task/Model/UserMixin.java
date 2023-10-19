package com.Task.Task.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.List;

public abstract class UserMixin {

    @JsonIgnore
    public abstract List<TaskUser> getFollowings();
    @JsonIgnore
    public abstract List<TaskUser> getFollowers();

}
