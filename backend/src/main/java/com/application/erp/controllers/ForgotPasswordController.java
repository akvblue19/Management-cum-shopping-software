package com.application.shopapp.controllers;

import com.application.shopapp.validation.PasswordValidation;
import com.application.shopapp.serviceImplementation.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping(value = "/e-commerce/user")
public class ForgotPasswordController
{
    @Autowired
    UserServiceImpl userService;

    @Autowired
    PasswordValidation passwordValidation;

    @PostMapping(path = "/forgot-password")
    public String forgotPassword(@RequestParam("email") String email) {
        return userService.forgotPassword(email);
    }

    @PutMapping(path = "/reset-password")
    public String resetPassword(@RequestParam("token")String token, @RequestParam("password") String newPassword, @RequestParam("confirmPassword") String confirmPassword) {
        if (passwordValidation.validatePassword(newPassword, confirmPassword)) {
            String message = userService.resetPassword(token, newPassword, confirmPassword);
                return message;
        } else {
            return "Password is Not Valid";
        }
    }
}
