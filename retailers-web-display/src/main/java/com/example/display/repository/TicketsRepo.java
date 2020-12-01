package com.example.display.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.display.model.Ticket;

/**
 * Created by fan.jin on 2016-10-15.
 */
public interface TicketsRepo extends JpaRepository<Ticket, Long> {
	
	
}

