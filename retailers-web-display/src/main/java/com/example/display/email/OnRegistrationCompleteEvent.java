package com.example.display.email;

import java.util.Locale;

import org.springframework.context.ApplicationEvent;

import com.example.display.model.User;

public class OnRegistrationCompleteEvent extends ApplicationEvent {
    
	private static final long serialVersionUID = 7102169707877010459L;
	
	private String url;
    private Locale locale;
    private User user;
    private String subject;
    private String textMessage;
 
    public OnRegistrationCompleteEvent(User user, Locale locale, String url, String subject, String textMessage) {
    	
        super(user);
        this.user = user;
        this.locale = locale;
        this.url = url;
        this.subject = subject;
        this.textMessage = textMessage;
    }

	public String getUrl() {
		return url;
	}


	public void setUrl(String url) {
		this.url = url;
	}


	public Locale getLocale() {
		return locale;
	}

	public void setLocale(Locale locale) {
		this.locale = locale;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}


	public String getSubject() {
		return subject;
	}

	public void setSubject(String subject) {
		this.subject = subject;
	}

	public String getTextMessage() {
		return textMessage;
	}

	public void setTextMessage(String textMessage) {
		this.textMessage = textMessage;
	}
	
	
    
}
	
