package com.example.display.email;

import java.util.UUID;

import javax.mail.internet.MimeMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

import com.example.display.exception.EmailException;
import com.example.display.model.User;
import com.example.display.service.UserService;
import com.example.display.util.EmailService;

@Component
public class RegistrationListener implements ApplicationListener<OnRegistrationCompleteEvent> {
  
    @Autowired
    private UserService userService;
  
    @Autowired
    private EmailService emailService;
 
    @Async
    @Override
    public void onApplicationEvent(OnRegistrationCompleteEvent event) {
        this.confirmRegistration(event);
    }
 
    private void confirmRegistration(OnRegistrationCompleteEvent event) {
        User user = event.getUser();
        String token = UUID.randomUUID().toString();
        userService.createVerificationToken(user, token);
        String subject = event.getSubject();
        String confirmationUrl = event.getUrl() + token;
        String textMessage = event.getTextMessage();
        
        try {
			MimeMessage message = emailService.prepareMailMessage(user, subject, confirmationUrl, textMessage);
			emailService.sendMailMessage(message);
		} catch (Exception me) {
			throw new EmailException(user.getEmail(), me.getMessage());
		}
    }
     
}
	
