package com.example.crawler.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.crawler.model.User;

/**
 * Created by fan.jin on 2016-10-15.
 */
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername( String username );
    void deleteByUsername( String username );
}

