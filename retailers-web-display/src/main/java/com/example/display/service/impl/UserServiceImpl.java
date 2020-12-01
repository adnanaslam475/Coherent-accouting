package com.example.display.service.impl;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.context.request.WebRequest;

import com.example.display.adapter.UserAdapter;
import com.example.display.adapter.reverse.UserAdapterReverse;
import com.example.display.api.UserApi;
import com.example.display.controller.AuthenticationRestController;
import com.example.display.email.OnRegistrationCompleteEvent;
import com.example.display.exception.ResourceConflictException;
import com.example.display.exception.ResourceNotFoundException;
import com.example.display.model.User;
import com.example.display.model.VerificationToken;
import com.example.display.repository.UserRepository;
import com.example.display.repository.VerificationTokenRepository;
import com.example.display.service.AuthorityService;
import com.example.display.service.UserService;

/**
 * Created by fan.jin on 2016-10-15.
 */

@Service
public class UserServiceImpl implements UserService {

	public static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);
	
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private AuthorityService authService;

	@Autowired
	private UserAdapter userAdapter;

	@Autowired
	private UserAdapterReverse userAdapterReverse;
	
	@Autowired
    private VerificationTokenRepository tokenRepository;
	
	@Autowired
	private ApplicationEventPublisher eventPublisher;
	
	 @Autowired
	 private AuthenticationManager authenticationManager;

	@Override
	// @PreAuthorize("hasRole('USER')")
	public UserApi findByUsername(String username) {

		User user = userRepository.findByUsername(username);
		if (user == null) {
			logger.error("User with username {} not found.", username);
			throw new ResourceNotFoundException(username, "User not found");
		}
		return userAdapter.adaptUser(user);
	}

	@Override
	// @PreAuthorize("hasRole('USER')")
	public UserApi findByEmail(String email) {

		User user = userRepository.findByEmail(email);
		if (user == null) {
			logger.error("User with email {} not found.", email);
			throw new ResourceNotFoundException(email, "User not found");
		}
		return userAdapter.adaptUser(user);
	}

	// @PreAuthorize("hasRole('ADMIN')")
	public User findById(Long id) throws AccessDeniedException {
		User u = userRepository.findOne(id);
		return u;
	}

	@PreAuthorize("hasRole('ADMIN')")
	public List<User> findAll() throws AccessDeniedException {
		List<User> result = userRepository.findAll();
		return result;
	}

	@Override
	public User saveUser(UserApi userApi, WebRequest request, HttpServletRequest servletRequest) {
		

		User existUser = this.userRepository.findByEmail(userApi.getEmail());
		if (existUser != null) {
			logger.error("Unable to create. An User with email {} already exist", userApi.getEmail());
			throw new ResourceConflictException(userApi.getEmail(), "Email already exists");
		}
		User user = userAdapterReverse.adaptUser(null, userApi);
		User registered = userRepository.save(user);
		
		String scheme = servletRequest.getScheme();             // http
	    String serverName = servletRequest.getServerName();     // hostname.com
	    int serverPort = servletRequest.getServerPort();        // 80
	    String contextPath = servletRequest.getContextPath();
	    StringBuffer requestURL = servletRequest.getRequestURL();
	    String appUrl = request.getContextPath();
	    String nginxUrl = AuthenticationRestController.NGINX_HOST_AND_PORT;
	 // Reconstruct original requesting URL
	    StringBuilder urlBulder = new StringBuilder();
//	    urlBulder.append(scheme).append("://").append(serverName).append(":").append(serverPort);
	    urlBulder.append(nginxUrl).append(contextPath).append("/api/regitration-confirm?token=");
	    String url = urlBulder.toString();
	    String subject = "Registration Confirmation";
	    String textMessage = "Please confirm your regsitration from the link below!";
		eventPublisher.publishEvent(new OnRegistrationCompleteEvent (registered, request.getLocale(), url, subject, textMessage));
		return registered;
	}

	@Override
	public void deleteByUsername(String username) {

		User user = this.userRepository.findByUsername(username);
		if (user == null) {
			logger.error("Unable to delete. User with name {} not found.", username);
			throw new ResourceNotFoundException(username, "User not found");
		}
		this.userRepository.deleteByUsername(username);
	}

	@Override
	public User updateUser(String username, UserApi userApi) {
		User user = userRepository.findByUsername(username);
		if (user == null) {
			logger.error("User with username {} not found.", username);
			throw new ResourceNotFoundException(username, "User not found");
		}
		User saved = userAdapterReverse.adaptUser(user, userApi);
		return userRepository.save(saved);
	}
	
	@Override
    public User getUser(String verificationToken) {
        User user = tokenRepository.findByToken(verificationToken).getUser();
        return user;
    }
	
	@Override
    public void createVerificationToken(User user, String token) {
        VerificationToken myToken = new VerificationToken(token, user);
        tokenRepository.save(myToken);
    }
	
	@Override
	public void changePassword(String oldPassword, String newPassword) {

        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        String username = currentUser.getName();

        if (authenticationManager != null) {
        	logger.debug("Re-authenticating user '"+ username + "' for password change request.");
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, oldPassword));
        } else {
        	logger.debug("No authentication manager set. can't change Password!");
            return;
        }

        logger.debug("Changing password for user '"+ username + "'");

        User user = userRepository.findByUsername(username);
        user.setLastPasswordResetDate(new Date());
        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
    }

}
