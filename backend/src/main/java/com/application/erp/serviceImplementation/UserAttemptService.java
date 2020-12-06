package com.application.shopapp.serviceImplementation;

import com.application.shopapp.entities.User;
import com.application.shopapp.entities.UserAttempts;
import com.application.shopapp.repository.UserAttemptRepository;
import com.application.shopapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class UserAttemptService {

    public static final int MAX_ATTEMPT = 2;

    @Autowired
    private UserAttemptRepository userAttemptRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    public void  userFailedAttempt(String username){
        UserAttempts userAttempt = userAttemptRepository.findByUsername(username);
        User user = userRepository.findByEmail(username);
        if (null != user){
            if(null != userAttempt){
                int attempt = userAttempt.getAttempts();
                if(attempt >= MAX_ATTEMPT){
                    userAttempt.setAttempts(attempt+1);
                    userAttempt.setLastModified(new Date());
                    userAttemptRepository.save(userAttempt);
                    user.setAccountNonLocked(false);
                    userRepository.save(user);
                    emailService.sendEmail("ACCOUNT LOCKED RE-SET PASSWORD ", "To reset your password, please click here " +
                            "with your email : " + "http://localhost:8080/e-commerce/user/forgot-password", user.getEmail());
                }else {
                    userAttempt.setAttempts(attempt+1);
                    userAttempt.setLastModified(new Date());
                    userAttemptRepository.save(userAttempt);
                }
            }else {
                UserAttempts userAttempts = new UserAttempts();
                userAttempts.setLastModified(new Date());
                userAttempts.setUsername(username);
                userAttempts.setAttempts(1);
                userAttemptRepository.save(userAttempts);
            }
        }
    }

    public void  userSuccessAttempt(String username){
        System.out.println("Username in user attempt : "+username);
        UserAttempts userAttempt = userAttemptRepository.findByUsername(username);
        User user = userRepository.findByEmail(username);
        if(null != user){
            if(null != userAttempt){
                userAttemptRepository.deleteByUsername(username);
            }
        }
    }
}
