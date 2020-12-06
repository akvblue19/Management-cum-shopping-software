package com.application.shopapp.dao;

import com.application.shopapp.dtos.UserAccessDto;
import com.application.shopapp.constant.AppUser;
import com.application.shopapp.constant.GrantedAuthorityImpl;
import com.application.shopapp.entities.Role;
import com.application.shopapp.exceptionhandler.UserNotFoundException;
import com.application.shopapp.serviceImplementation.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public class UserDao {

    @Autowired
    UserServiceImpl userService;


    public AppUser loadUserByUsername(String username) {
        UserAccessDto user = userService.findUser(username);
        System.out.println(user.getPassword());

        List<GrantedAuthorityImpl> grantedAuthorityImpl = new ArrayList<>();
        System.out.println(user);
        if(user!= null) {
            if (user.isActive()) {
                for (Role auth : user.getRoleList()) {
                    grantedAuthorityImpl.add(new GrantedAuthorityImpl(auth.getAuthority()));
                }
                System.out.println(grantedAuthorityImpl);
                return new AppUser(user.getEmail(), user.getPassword(),
                        grantedAuthorityImpl,user.isAccountNonLocked());
            } else {
                throw new UserNotFoundException("ERROR 001:","Account is not activated");
            }
        }else {
            throw new UserNotFoundException("ERROR 001","User not found");
        }
    }
}

