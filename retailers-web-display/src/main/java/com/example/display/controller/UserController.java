package com.example.display.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.util.UriComponentsBuilder;

import com.example.display.api.UserApi;
import com.example.display.model.User;
import com.example.display.service.UserService;

@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class UserController {

	public static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private UserService userService;

	@RequestMapping(method = RequestMethod.GET, value = "/user/{username}")
	public ResponseEntity<UserApi> loadByUsername(@PathVariable String username) {
		logger.info("Fetching user with username {}", username);
		UserApi user = this.userService.findByUsername(username);
		logger.info("User with username {} found.", username);
		return new ResponseEntity<UserApi>(user, HttpStatus.OK);
	}

	@RequestMapping(method = RequestMethod.POST, value = "/user/create")
	public ResponseEntity<Void> addUser(@RequestBody UserApi userApi, UriComponentsBuilder ucBuilder,
			WebRequest request, HttpServletRequest servletRequest) {
		logger.info("Creating User : {}", userApi.toString());
		User user = this.userService.saveUser(userApi, request, servletRequest);
		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(ucBuilder.path("/api/user/{userId}").buildAndExpand(user.getId()).toUri());
		return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/user/delete/{username}")
	public ResponseEntity<Void> deleteByUsername(@PathVariable String username) {
		logger.info("Deleting user with username {}", username);
		userService.deleteByUsername(username);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}

	@RequestMapping(value = "/user/update/{username}", method = RequestMethod.PUT)
	public ResponseEntity<Void> updateUser(@PathVariable("username") String username, @RequestBody UserApi userApi) {
		logger.info("Updating User with number {}", username);
		userService.updateUser(username, userApi);
		return new ResponseEntity<Void>(HttpStatus.OK);
	}
	
	@RequestMapping(value = "/user/change-password", method = RequestMethod.POST)
    public ResponseEntity<?> changePassword(@RequestBody PasswordChanger passwordChanger) {
		userService.changePassword(passwordChanger.oldPassword, passwordChanger.newPassword);
        return new ResponseEntity<Void>(HttpStatus.OK);
    } 

	/*
	 * We are not using userService.findByUsername here(we could), so it is good
	 * that we are making sure that the user has role "ROLE_USER" to access this
	 * endpoint.
	 */
	@RequestMapping("/whoami") 
	public User user() {      
		return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
	}

	static class PasswordChanger {
		public String oldPassword;
		public String newPassword;
	}

}
