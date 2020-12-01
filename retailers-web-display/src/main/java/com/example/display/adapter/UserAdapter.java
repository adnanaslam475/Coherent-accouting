package com.example.display.adapter;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.display.api.UserApi;
import com.example.display.model.User;


@Component
public class UserAdapter {
	
	public UserApi adaptUser(User user) {
		
		if(user == null) {
			return null;
		}
		
		UserApi userAPI = new UserApi();
		userAPI.setId(user.getId());
		userAPI.setEmail(user.getEmail());
		userAPI.setPassword(user.getPassword());
		userAPI.setFirstname(user.getFirstName());
		userAPI.setLastname(user.getLastName());
		userAPI.setUsername(user.getUsername());
		return userAPI;
		
	}

}
