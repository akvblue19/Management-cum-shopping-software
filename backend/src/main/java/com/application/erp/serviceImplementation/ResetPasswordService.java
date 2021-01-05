package com.application.shopapp.serviceImplementation;

import com.application.shopapp.entities.User;
import com.application.shopapp.entities.VerificationToken;
import com.application.shopapp.repository.UserRepository;
import com.application.shopapp.repository.VerificationTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.UUID;

@Service
public class ResetPasswordService {

        @Autowired
        PasswordEncoder passwordEncoder;
        @Autowired
        private UserRepository userRepository;

        @Autowired
        private EmailService emailService;

        @Autowired
        private VerificationTokenRepository verificationTokenRepository;

        @Transactional
        public String resetPassword(String token,String newPassword,String confirmPassword) {
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
                            boolean isPasswordUpdated = updatingPassword(newPassword,user,confirmPassword);
                            if(isPasswordUpdated) {
                                sb.append("Successfully Updated");
                            } else {
                                sb.append("Password not Matched");
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

        boolean updatingPassword(String newPassword, User user,String confirmPassword){
            boolean flag = false;
            try {
                if(newPassword.equals(confirmPassword)) {
                    String pass = passwordEncoder.encode(confirmPassword);
                    user.setPassword(pass);
                    userRepository.save(user);
                    verificationTokenRepository.deleteByUserEmail(user.getEmail());
                    flag = true;
                } else {
                    flag = false;
                }
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
                emailService.sendEmail("NEW RE-SET PASSWORD TOKEN","To reset password, please click here : "
                        +"http://127.0.0.1:8080/e-commerce/user/reset-password?token="+newToken,email);
                flag = true;
            }
            return flag;
        }
}
