package com.application.shopapp.dtos;

import com.application.shopapp.entities.Role;

import java.io.Serializable;
import java.util.List;
import java.util.Set;

public class UserAccessDto implements Serializable {

    private String email;
    private String password;
    private Set<Role> roleList;
    private boolean isActive;
    private boolean isAccountNonLocked;

    public UserAccessDto(String email, String password, Set<Role> roleList, boolean isActive,boolean isAccountNonLocked) {
        this.email = email;
        this.password = password;
        this.roleList = roleList;
        this.isActive = isActive;
        this.isAccountNonLocked = isAccountNonLocked;
    }


    public boolean isAccountNonLocked() {
        return isAccountNonLocked;
    }

    public void setAccountNonLocked(boolean accountNonLocked) {
        isAccountNonLocked = accountNonLocked;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Set<Role> getRoleList() {
        return roleList;
    }

    public void setRoleList(Set<Role> roleList) {
        this.roleList = roleList;
    }

    public boolean isActive() {
        return isActive;
    }

    public void setActive(boolean active) {
        isActive = active;
    }

    @Override
    public String toString() {
        return "UserAccessDto{" +
                "email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", role=" + roleList +
                ", isActive=" + isActive +
                '}';
    }
}
