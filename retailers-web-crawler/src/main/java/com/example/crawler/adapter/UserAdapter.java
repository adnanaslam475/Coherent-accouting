//package com.example.crawler.adapter;
//
//
//import org.springframework.stereotype.Component;
//
//import com.example.crawler.api.UserApi;
//import com.example.crawler.model.User;
//
//
//@Component
//public class UserAdapter {
//	
//	public UserApi adaptUser(User user) {
//		
//		if(user == null) {
//			return null;
//		}
//		
//		UserApi userAPI = new UserApi();
//		userAPI.setId(user.getId());
//		userAPI.setEmail(user.getEmail());
//		userAPI.setPassword(user.getPassword());
//		userAPI.setFirstname(user.getFirstName());
//		userAPI.setLastname(user.getLastName());
//		userAPI.setUsername(user.getUsername());
//		return userAPI;
//		
//	}
//
//}