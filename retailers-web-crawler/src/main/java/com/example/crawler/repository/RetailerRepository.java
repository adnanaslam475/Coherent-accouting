package com.example.crawler.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.crawler.model.Retailer;

/**
 * Created by fan.jin on 2016-10-15.
 */
public interface RetailerRepository extends JpaRepository<Retailer, Long> {
	
	Retailer findByRetailerUsername(String retailerUsername);
    
}

