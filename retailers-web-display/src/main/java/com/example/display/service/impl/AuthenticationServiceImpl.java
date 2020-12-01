package com.example.display.service.impl;

import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.MessageSource;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.context.request.WebRequest;

import com.example.display.api.ResetPasswordApi;
import com.example.display.controller.AuthenticationRestController;
import com.example.display.controller.AuthenticationRestController.ForgotPasswordApi;
import com.example.display.email.OnRegistrationCompleteEvent;
import com.example.display.exception.EmailException;
import com.example.display.exception.InvalidTokenException;
import com.example.display.exception.ResourceConflictException;
import com.example.display.exception.ResourceNotFoundException;
import com.example.display.exception.TokenExpiredException;
import com.example.display.model.User;
import com.example.display.model.VerificationToken;
import com.example.display.repository.UserRepository;
import com.example.display.repository.VerificationTokenRepository;
import com.example.display.service.AuthenticationService;

@Service
public class AuthenticationServiceImpl  implements AuthenticationService {
	
	public static final Logger logger = LoggerFactory.getLogger(AuthenticationServiceImpl.class);
	
	@Autowired
	private VerificationTokenRepository verificationTokenRepository;
	
	@Autowired
    private MessageSource messages;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private ApplicationEventPublisher eventPublisher;
	
	@Autowired
	private PasswordEncoder passwordEncoder;

	@Override
	public void confirmRegistration(String token, WebRequest request) {
//		Locale locale = request.getLocale();
        
        VerificationToken verificationToken = validateToken(token);
        User user = verificationToken.getUser();
        user.setEnabled(true); 
        userRepository.save(user);
//        verificationTokenRepository.delete(verificationToken);
	}

	@Override
	public void forgotPassword(ForgotPasswordApi forgotPasswordApi, HttpServletRequest request) {
		String email = forgotPasswordApi.getEmail();
		User existUser = this.userRepository.findByEmail(email);
		if (existUser == null) {
			logger.error("User with email {} not found.", email);
			throw new ResourceNotFoundException(email, "User not found");
		}
		
		String scheme = request.getScheme();             // http
	    String serverName = request.getServerName();     // hostname.com
	    int serverPort = request.getServerPort();        // 80
	    String contextPath = request.getContextPath();
	    StringBuffer requestURL = request.getRequestURL();
	    String nginxUrl = AuthenticationRestController.NGINX_HOST_AND_PORT;
	    
	 // Reconstruct original requesting URL
	    StringBuilder urlBulder = new StringBuilder();
//	    urlBulder.append(scheme).append("://").append(serverName).append(":").append(serverPort);
	    urlBulder.append(nginxUrl).append(contextPath).append("/api/user/forgot-password?token=");
	    String url = urlBulder.toString();
	    String subject = "Forgot Password";
	    String textMessage = "You've requested a password reset.";
		eventPublisher.publishEvent(new OnRegistrationCompleteEvent (existUser, request.getLocale(), url, subject, textMessage));
		
	}

	@Override
	public void resetForgotPassword(String token, WebRequest request) {
		Locale locale = request.getLocale();
		validateToken(token); 
	}

	@Override
	public void saveForgotPassword(ResetPasswordApi resetPasswordApi) {
		
		VerificationToken verificationToken = validateToken(resetPasswordApi.getToken());
		if (resetPasswordApi.getPassword().equals(resetPasswordApi.getConfirmPassword())) {
			User user = verificationToken.getUser();
			user.setLastPasswordResetDate(new Date());
			user.setPassword(passwordEncoder.encode(resetPasswordApi.getPassword()));
			userRepository.save(user);
//			verificationTokenRepository.delete(verificationToken);
		} else {
			throw new ResourceConflictException("Password!", "Passwords doesn't match!");
		}
      
	}
	
	private VerificationToken validateToken(String token) {
		VerificationToken verificationToken = verificationTokenRepository.findByToken(token);
		if (verificationToken == null) {
//          String message = messages.getMessage("auth.message.invalidToken", null, locale);
			throw new InvalidTokenException("Not Valid Token", "Not valid token!");
		}
		
		Calendar cal = Calendar.getInstance();
		if ((verificationToken.getExpiryDate().getTime() - cal.getTime().getTime()) <= 0) {
//          String messageValue = messages.getMessage("auth.message.expired", null, locale);
			throw new TokenExpiredException(verificationToken.getToken(), "Token Expired!");
		} 
		
		return verificationToken;
	}

}
