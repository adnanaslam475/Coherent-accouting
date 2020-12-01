package com.example.display.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.example.display.model.UsersRetailers;


public interface UsersRetailersRepo extends JpaRepository<UsersRetailers, Long> {
	
//	@Query("SELECT p FROM UsersRetailers p WHERE p.user.username = :username and p.isVisible = :isVisible and p.isDropshipper = :isDropshipper")
//	Page<UsersRetailers> findByUsernameAndIsVisible(@Param("username") String username, Pageable pageable, @Param("isVisible") boolean isVisible, @Param("isDropshipper") boolean isDropshipper);
//	
//	@Query("SELECT p FROM UsersRetailers p WHERE p.user.username = :username and p.isDropshipper = :isDropshipper")
//	Page<UsersRetailers> findByUsernameAndIsDropshipper(@Param("username") String username, Pageable pageable, @Param("isDropshipper") boolean isDropshipper);
	
	@Query("SELECT p FROM UsersRetailers p WHERE p.user.username = :username")
	Page<UsersRetailers> findByUserUsername(@Param("username") String username, Pageable pageable);
	
	@Modifying
    @Transactional
    @Query("delete from UsersRetailers p where p.id IN (SELECT n2.id FROM UsersRetailers n2 WHERE n2.user.username = :userUsername and n2.retailer.retailerUsername = :retailerUsername)")
    void deleteUserRetailersByUserUsernameAndRetailerUsername(@Param("userUsername") String userUsername, @Param("retailerUsername") String retailerUsername);
	
	@Query("SELECT p FROM UsersRetailers p where p.retailer.retailerUsername = :retailerUsername")
	List<UsersRetailers> getUsersRetailersByRetailerUsername(@Param("retailerUsername") String retailerUsername);

	@Query("SELECT p FROM UsersRetailers p where p.retailer.retailerUsername = :retailerUsername and p.user.username = :userUsername")
	UsersRetailers getUsersRetailersByRetailerUsernameAndUserUsername(@Param("retailerUsername") String retailerUsername, @Param("userUsername") String userUsername);

}
