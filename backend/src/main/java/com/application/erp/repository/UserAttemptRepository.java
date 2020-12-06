package com.application.shopapp.repository;

import com.application.shopapp.entities.UserAttempts;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserAttemptRepository extends JpaRepository<UserAttempts,Long> {

    UserAttempts findByUsername(String username);

    void deleteByUsername(String username);
}
