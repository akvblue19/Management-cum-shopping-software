package com.application.shopapp.serviceImplementation;

import com.application.shopapp.entities.User;
import com.application.shopapp.entities.VerificationToken;
import com.application.shopapp.exceptionhandler.UserNotFoundException;
import com.application.shopapp.repository.UserRepository;
import com.application.shopapp.repository.VerificationTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.UUID;

@Service
public class UserActivationService {


    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private VerificationTokenRepository verificationTokenRepository;

    @Transactional
    public String activateUser(String token) {
        VerificationToken token1 = verificationTokenRepository.findByToken(token);
        StringBuilder sb = new StringBuilder();
        User user = null;
        if(token1 != null) {
            try {
                String email = token1.getUserEmail();
                if (!email.equals(null)){
                    boolean flag = isTokenExpired(email, token1);
                    if(!flag) {
                        user = userRepository.findByEmail(token1.getUserEmail());
                        boolean isActivated = activatingUser(email,user);
                        if(isActivated) {
                            sb.append("Successfully activated");
                        }
                    }else {
                        sb.append("Token Expired");
                    }
                }
            } catch (NullPointerException ex) {
                sb.append("No email found");
            }

        }else{
            sb.append("Invalid Token");
        }
        return sb.toString();
    }

    boolean activatingUser(String email, User user){
        boolean flag = false;
        try {
            user.setActive(true);
            userRepository.save(user);
            emailService.sendEmail("ACCOUNT ACTIVATED", "Your account has been activated", email);
            verificationTokenRepository.deleteByUserEmail(email);
            flag = true;
        }catch(Exception e){
            e.printStackTrace();
        }
        return flag;
    }

    boolean isTokenExpired(String email, VerificationToken token ){
        Date date = new Date();
        long diff = date.getTime() - token.getGeneratedDate().getTime();
        long diffHours = diff / (60 * 60 * 1000);
        boolean flag = false;
        if (diffHours > 24) {
            verificationTokenRepository.deleteByUserEmail(email);
            String newToken = UUID.randomUUID().toString();
            VerificationToken token1 = new VerificationToken();
            token1.setToken(newToken);
            token1.setUserEmail(email);
            token1.setGeneratedDate(new Date());
            verificationTokenRepository.save(token1);
            emailService.sendEmail("RE-ACCOUNT ACTIVATE TOKEN","To confirm your account, please click here : "
                    +"http://127.0.0.1:8080/e-commerce/register/confirm-account?token="+newToken,email);
            flag = true;
        }
        return flag;
    }

    @Transactional
    public String resendLink(String email) {
        if(email.isEmpty()){
            throw new UserNotFoundException("","Please Enter all the fields");
        }
        User user = userRepository.findByEmail(email);
        if(user==null){
            throw new UserNotFoundException("","USER NOT PRESENT WITH THIS MAIL ID");
        }
        if (user.isActive()) {
            throw new UserNotFoundException("","USER ALREADY ACTIVE");
        }
        if (!user.isActive()) {
            verificationTokenRepository.deleteByUserEmail(email);
            String newToken = UUID.randomUUID().toString();
            VerificationToken token = new VerificationToken();
            token.setToken(newToken);
            token.setUserEmail(email);
            token.setGeneratedDate(new Date());
            verificationTokenRepository.save(token);
            emailService.sendEmail("RE-ACCOUNT ACTIVATE TOKEN","To confirm your account, please click here : "
                    +"http://127.0.0.1:3000/confirm-account?token="+newToken,email);
            return "Successful";
        }
        return "Successful";
    }
}
