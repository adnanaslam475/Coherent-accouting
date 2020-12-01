package com.example.display.adapter.reverse;

import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

import com.example.display.api.TicketApi;
import com.example.display.model.Ticket;
import com.example.display.model.User;

@Component
public class TicketAdapterReverse {
	
	public Ticket adaptTicket(Ticket ticket, TicketApi ticketApi, User user) {
		
		if (ticket == null) {
			ticket = new Ticket();
			ticket.setTitle(ticketApi.getTitle());
			ticket.setTicketContent(ticketApi.getTicketContent());
			ticket.setCreationDate(LocalDateTime.now());
			ticket.setUser(user);
		}
		ticket.setStatus(Ticket.TicketStatus.valueOf(ticketApi.getStatus()));
		ticket.setAnswer(ticketApi.getAnswer());
		return ticket;
	}

}
