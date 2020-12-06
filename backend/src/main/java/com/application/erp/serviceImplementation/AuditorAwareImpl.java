package com.application.shopapp.serviceImplementation;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.AuditorAware;

public class AuditorAwareImpl implements AuditorAware<String> {


    @Autowired
    UserServiceImpl userService;

    @Override
    public Optional<String> getCurrentAuditor() {
        String username = userService.getUserName();
        return Optional.of(username);
    }
}

