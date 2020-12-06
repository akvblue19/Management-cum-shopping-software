package com.application.shopapp.repository;

import com.application.shopapp.entities.VerificationToken;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken,Long> {

    VerificationToken findByUserEmail(String email);

    void deleteByUserEmail(String email);

    VerificationToken findByToken(String token);

}
