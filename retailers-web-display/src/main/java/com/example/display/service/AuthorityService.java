package com.example.display.service;

import java.util.List;

import com.example.display.model.Authority;

public interface AuthorityService {
  List<Authority> findById(Long id);

  List<Authority> findByname(String name);

}
