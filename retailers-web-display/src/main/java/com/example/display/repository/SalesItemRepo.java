package com.example.display.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.display.model.SalesItem;


public interface SalesItemRepo extends JpaRepository<SalesItem, Long> {
	
//	@Query("SELECT p FROM SalesItem p WHERE p.retailer.retailerUsername = :retailerUsername")
//	Page<SalesItem> findByRetailerUsername(@Param("retailerUsername") String retailerUsername, Pageable pageable);
	
	SalesItem findByUrl(String url);
	
	@Query("SELECT p FROM SalesItem p INNER JOIN p.usersSalesItems AS alias1 WHERE alias1.user.username = :username")
	Page<SalesItem> findSalesItemsByPagePerUser(@Param("username") String username, Pageable pageable);
	
	@Query("SELECT p FROM SalesItem p INNER JOIN p.usersSalesItems AS alias1 WHERE p.retailer.retailerUsername = :retailerUsername and alias1.user.username = :username")
	Page<SalesItem> findSalesItemsByPagePerUserPerRetailer(@Param("retailerUsername") String retailerUsername, @Param("username") String username, Pageable pageable);
}
