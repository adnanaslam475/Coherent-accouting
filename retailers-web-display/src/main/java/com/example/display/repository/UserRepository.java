package com.example.display.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.display.model.User;

/**
 * Created by fan.jin on 2016-10-15.
 */
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername( String username );
    User findByEmail( String email );
    void deleteByUsername( String username );
}

