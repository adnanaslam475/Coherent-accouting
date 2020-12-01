package com.example.display.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.example.display.api.TicketApi;
import com.example.display.model.Ticket;
import com.example.display.service.TicketsService;


@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class TicketsController {

	public static final Logger logger = LoggerFactory.getLogger(TicketsController.class);
	
	@Autowired
	private TicketsService ticketsService;

	@RequestMapping(value = "/ticket/create-ticket", method = RequestMethod.POST)
	public ResponseEntity<Void> createTicket(@RequestBody TicketApi ticketApi, UriComponentsBuilder ucBuilder) {
		logger.info("Creating ticket with title {}", ticketApi.getTitle());
		Ticket ticket = ticketsService.createTicket(ticketApi);
		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(ucBuilder.path("/api/ticket/{ticketId}").buildAndExpand(ticket.getId()).toUri());
		return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
	}

}
