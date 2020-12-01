package com.example.display.adapter.reverse;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.example.display.api.UserApi;
import com.example.display.model.Authority;
import com.example.display.model.AuthorityName;
import com.example.display.model.User;
import com.example.display.repository.AuthorityRepository;

@Component
public class UserAdapterReverse {
	
	@Autowired
	private AuthorityRepository authorityRepository;
	
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	public User adaptUser(User old, UserApi userApi) {
		
		if(userApi == null) {
			return null;
		}
		
		if(old == null) {
			old = new User();
		}
		List<String> authorities = new ArrayList<>();
		authorities.add("ROLE_USER");
		old.setUsername(userApi.getUsername());
		old.setPassword(passwordEncoder.encode(userApi.getPassword()));
		old.setFirstName(userApi.getFirstname());
		old.setLastName(userApi.getLastname());
		old.setSubscribedToDate(LocalDateTime.now());
		old.setEmail(userApi.getEmail());
		old.setEnabled(false);
		old.setIpAddress(userApi.getIpAddress());
		this.addAuthorities(old, authorities);
		return old;
	}
	
	private User addAuthorities(User user, List<String> authorities) {
		
		for(String auth : authorities) {
			Authority authority = authorityRepository.findByName(AuthorityName.valueOf(auth));
			user.addAuthority(authority);
		}
		
		return user;
		
	}
}
