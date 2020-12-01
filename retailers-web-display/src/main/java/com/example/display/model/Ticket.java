package com.example.display.model;
 

import java.io.Serializable;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;


@Entity
@Table(name = "TICKETS")
public class Ticket implements Serializable {

	private static final long serialVersionUID = 8063591507673098088L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", updatable = false, nullable = false, unique = true)
	private long id;
	
	@Column(name = "title", length = 250)
	private String title;
	
	@Column(name = "ticket_content", length = 250)
	private String ticketContent;
	
	@Column(name = "answer", length = 250)
	private String answer;
	
	@Column(name = "status", length = 80)
	@Enumerated(EnumType.STRING)
	private TicketStatus status;
	
	@Column(name = "creation_date")
	private LocalDateTime creationDate;
	
	@ManyToOne
    @JoinColumn(name = "user_id")  
	private User user;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getTicketContent() {
		return ticketContent;
	}

	public void setTicketContent(String ticketContent) {
		this.ticketContent = ticketContent;
	}

	public String getAnswer() {
		return answer;
	}

	public void setAnswer(String answer) {
		this.answer = answer;
	}

	public TicketStatus getStatus() {
		return status;
	}

	public void setStatus(TicketStatus status) {
		this.status = status;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public LocalDateTime getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(LocalDateTime creationDate) {
		this.creationDate = creationDate;
	}
	
	public enum TicketStatus {
		CREATED,
		IN_PROGRESS,
		RESOLVED
	}
	
	

}
