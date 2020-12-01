package com.example.display.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.display.model.User;
import com.example.display.model.VerificationToken;

public interface VerificationTokenRepository extends JpaRepository<VerificationToken, Long> {
	
	VerificationToken findByToken(String token);
	 
    VerificationToken findByUser(User user);
}
