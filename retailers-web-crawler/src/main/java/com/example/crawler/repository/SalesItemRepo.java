package com.example.crawler.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.crawler.model.SalesItem;


public interface SalesItemRepo extends JpaRepository<SalesItem, Long> {
	
	@Query("SELECT p FROM SalesItem p WHERE p.retailer.retailerUsername = :retailerUsername")
	Page<SalesItem> findByRetailerUsername(@Param("retailerUsername") String retailerUsername, Pageable pageable);
	
	

}
