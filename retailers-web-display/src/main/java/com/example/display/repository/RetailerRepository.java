package com.example.display.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.display.model.Retailer;

/**
 * Created by fan.jin on 2016-10-15.
 */
public interface RetailerRepository extends JpaRepository<Retailer, Long> {
	
	Retailer findByRetailerUsername( String retailerUsername );
	
	@Query("SELECT p FROM Retailer p INNER JOIN p.usersRetailers AS alias1 WHERE alias1.user.username = :username")
	Page<Retailer> findByUserUsername(@Param("username") String username, Pageable pageable);
    
}

