package com.application.shopapp.serviceImplementation;

import com.application.shopapp.dtos.UserSaveDto;
import com.application.shopapp.entities.Role;
import com.application.shopapp.entities.User;
import com.application.shopapp.exceptionhandler.UserNotFoundException;
import com.application.shopapp.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.context.i18n.LocaleContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletResponse;
import java.util.HashSet;
import java.util.Set;


@Service
public class AdminServiceImpl implements com.application.shopapp.service.AdminService {

    @Autowired
    UserRepository userRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    MessageSource messageSource;



    @Override
    @Transactional
    public String saveAdmin(UserSaveDto userSaveDto) {
        String pass = passwordEncoder.encode(userSaveDto.getPassword());
        userSaveDto.setPassword(pass);
        User user = new User();
        user.setActive(userSaveDto.isActive());
        user.setId(userSaveDto.getId());
        User existedEmail = userRepository.findByEmail(userSaveDto.getEmail());
        if(existedEmail != null) {
            throw new UserNotFoundException("ERROR 001","EMAIL ALREADY EXIST");
        }
        user.setEmail(userSaveDto.getEmail());
        user.setAccountNonLocked(userSaveDto.isAccountNonLocked());
        user.setPassword(userSaveDto.getPassword());
        user.setFirstName(userSaveDto.getFirstName());
        user.setMiddleName(userSaveDto.getMiddleName());
        user.setLastName(userSaveDto.getLastName());
        Set<Role> roleList = new HashSet<>();
        Role role = new Role();
        role.setAuthority("ROLE_ADMIN");
        roleList.add(role);
        user.setRoleList(roleList);
        if(userSaveDto.getProfile()!= null) {
            user.setProfile(userSaveDto.getProfile());
        }
        userRepository.save(user);
        return messageSource.getMessage("get.output.message",null, LocaleContextHolder.getLocale());
    }


}