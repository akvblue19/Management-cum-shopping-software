package com.application.shopapp.validation;

import org.springframework.stereotype.Component;

@Component
public class PasswordValidation {

    private static final String pattern = "((?=.*[a-z])(?=.*[0-9])(?=.*[A-Z])(?=.*[@#$%!]).{8,15})";

    public boolean validatePassword(String pass, String cpass) {
        if (pass.matches(pattern)) {
            if (cpass.matches(pattern)) {
                return true;
            }
        }
        return false;
    }
}