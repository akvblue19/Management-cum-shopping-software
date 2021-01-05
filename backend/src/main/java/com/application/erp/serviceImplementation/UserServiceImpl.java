package com.application.shopapp.serviceImplementation;

import com.application.shopapp.dtos.UserAccessDto;
import com.application.shopapp.entities.User;
import com.application.shopapp.entities.VerificationToken;
import com.application.shopapp.exceptionhandler.UserNotFoundException;
import com.application.shopapp.repository.UserAttemptRepository;
import com.application.shopapp.repository.UserRepository;
import com.application.shopapp.repository.VerificationTokenRepository;
import com.application.shopapp.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.UUID;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    UserAttemptRepository userAttemptRepository;

    @Autowired
    VerificationTokenRepository verificationTokenRepository;

    @Autowired
    UserRepository userRepository;

    @Autowired
    EmailService emailService;

    @Autowired
    ResetPasswordService resetPasswordService;

    @Override
    @Transactional
    public String forgotPassword(String email) {
        if(email.isEmpty()){
            throw new UserNotFoundException("ERROR 001","Please Enter All the Fields");
        }
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UserNotFoundException("ERROR 001","USER NOT REGISTERED");
        } else if (user.isActive() == false) {
            throw new UserNotFoundException("ERROR 001","USER IS NOT ACTIVATED");
        } else {
            user.setAccountNonLocked(true);
            userAttemptRepository.deleteByUsername(email);
            userRepository.save(user);

            VerificationToken token1 = verificationTokenRepository.findByUserEmail(email);
            if (token1 != null) {
                verificationTokenRepository.deleteByUserEmail(email);
            }else {
                String token = UUID.randomUUID().toString();
                VerificationToken confirmToken = new VerificationToken();
                confirmToken.setToken(token);
                confirmToken.setUserEmail(user.getEmail());
                confirmToken.setGeneratedDate(new Date());
                verificationTokenRepository.save(confirmToken);
                emailService.sendEmail("RE-SET PASSWORD TOKEN", "To reset your password, please click here : "
                        + "http://127.0.0.1:3000/reset/password?token=" + token, user.getEmail());
            }
        }
        return "message sent check the mail";
    }

    @Override
    @Transactional
    public String resetPassword(String token,String newPassword,String confirmPassword) {
        return resetPasswordService.resetPassword(token,newPassword,confirmPassword);
    }

    @Override
    @Transactional
    public UserAccessDto findUser(String email) {
        User user = userRepository.findByEmail(email);
        return new UserAccessDto(user.getEmail(),user.getPassword(),user.getRoleList(),user.isActive(),user.isAccountNonLocked());
    }

    public String getUserName() {
        Authentication authentication = SecurityContextHolder.getContext()
                .getAuthentication();
        UserDetails userDetail = (UserDetails) authentication.getPrincipal();
        return userDetail.getUsername();
    }
}
