package com.example.display.service.impl;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.display.adapter.reverse.TicketAdapterReverse;
import com.example.display.api.TicketApi;
import com.example.display.model.Ticket;
import com.example.display.model.User;
import com.example.display.repository.TicketsRepo;
import com.example.display.repository.UserRepository;
import com.example.display.service.TicketsService;

/**
 * Created by fan.jin on 2016-10-15.
 */

@Service
public class TicketsServiceImpl implements TicketsService {

	public static final Logger logger = LoggerFactory.getLogger(TicketsServiceImpl.class);
	
	@Autowired
	private UserRepository userRepository;
	
	 @Autowired
	 private TicketsRepo ticketsRepo;
	 
	 @Autowired
	 private TicketAdapterReverse ticketAdapterReverse;

	
	@Override
	public Ticket createTicket(TicketApi ticketApi) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        String username = currentUser.getName();
        User user = this.userRepository.findByUsername(username);
        Ticket ticket = ticketAdapterReverse.adaptTicket(null, ticketApi, user);
        Ticket saved = ticketsRepo.save(ticket);
		return saved;
	}

}
