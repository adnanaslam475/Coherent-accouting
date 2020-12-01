package com.example.crawler.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.crawler.model.UsersRetailers;


public interface UsersRetailersRepo extends JpaRepository<UsersRetailers, Long> {
	
//	@Query("SELECT p FROM UsersRetailers p WHERE p.user.username = :username and p.isVisible = :isVisible and p.isDropshipper = :isDropshipper")
//	Page<UsersRetailers> findByUsernameAndIsVisible(@Param("username") String username, Pageable pageable, @Param("isVisible") boolean isVisible, @Param("isDropshipper") boolean isDropshipper);
//	
//	@Query("SELECT p FROM UsersRetailers p WHERE p.user.username = :username and p.isDropshipper = :isDropshipper")
//	Page<UsersRetailers> findByUsernameAndIsDropshipper(@Param("username") String username, Pageable pageable, @Param("isDropshipper") boolean isDropshipper);
	
	
	@Query("SELECT p FROM UsersRetailers p where p.retailer.retailerUsername = :retailerUsername")
	List<UsersRetailers> getUsersRetailersByRetailerUsername(@Param("retailerUsername") String retailerUsername);

	

}
