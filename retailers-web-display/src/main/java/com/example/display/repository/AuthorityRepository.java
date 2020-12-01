package com.example.display.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.display.model.Authority;
import com.example.display.model.AuthorityName;

public interface AuthorityRepository extends JpaRepository<Authority, Long> {
  Authority findByName(AuthorityName name);
}
