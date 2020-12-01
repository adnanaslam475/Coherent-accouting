package com.example.display.service.impl;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.display.model.Authority;
import com.example.display.model.AuthorityName;
import com.example.display.repository.AuthorityRepository;
import com.example.display.service.AuthorityService;

@Service
public class AuthorityServiceImpl implements AuthorityService {

  @Autowired
  private AuthorityRepository authorityRepository;

  @Override
  public List<Authority> findById(Long id) {
    // TODO Auto-generated method stub

    Authority auth = this.authorityRepository.findOne(id);
    List<Authority> auths = new ArrayList<>();
    auths.add(auth);
    return auths;
  }

  @Override
  public List<Authority> findByname(String name) {
    // TODO Auto-generated method stub
    Authority auth = this.authorityRepository.findByName(AuthorityName.valueOf(name));
    List<Authority> auths = new ArrayList<>();
    auths.add(auth);
    return auths;
  }

}
