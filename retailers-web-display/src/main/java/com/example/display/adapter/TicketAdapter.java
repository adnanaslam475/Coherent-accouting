package com.example.display.adapter;


import org.springframework.stereotype.Component;

import com.example.display.api.TicketApi;
import com.example.display.model.Ticket;
import com.example.display.util.JwtTokenUtil;

@Component
public class TicketAdapter {
	
	public TicketApi adaptTicket(Ticket ticket) {
		
		if(ticket == null) {
			return null;
		}
		
		TicketApi ticketApi = new TicketApi();
		ticketApi.setTitle(ticket.getTitle());
		ticketApi.setTicketContent(ticket.getTicketContent());
		ticketApi.setAnswer(ticket.getAnswer());
		ticketApi.setCreationDate(JwtTokenUtil.getDateAsString(ticket.getCreationDate()));
		ticketApi.setStatus(ticket.getStatus().toString());
		return ticketApi;
		
	}

}
