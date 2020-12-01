package com.example.display.service;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.context.request.WebRequest;

import com.example.display.api.UserApi;
import com.example.display.model.User;

/**
 * Created by fan.jin on 2016-10-15.
 */
public interface UserService {
	
  User findById(Long id);
  
  User updateUser(String username, UserApi userApi);

  UserApi findByUsername(String username);
  
  UserApi findByEmail(String email);
  
  void deleteByUsername(String username);

  List<User> findAll();

  User saveUser(UserApi userapi, WebRequest request, HttpServletRequest servletRequest);
  
  User getUser(String verificationToken);
  
  void createVerificationToken(User user, String token);
  
  void changePassword(String oldPassword, String newPassword);
  
}
