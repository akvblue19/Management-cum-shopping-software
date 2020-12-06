package com.application.shopapp.service;

import com.application.shopapp.dtos.UserAccessDto;

public interface UserService {

    String forgotPassword(String email);

    String resetPassword(String token,String newPassword,String confirmPassword);

    UserAccessDto findUser(String email);
}
