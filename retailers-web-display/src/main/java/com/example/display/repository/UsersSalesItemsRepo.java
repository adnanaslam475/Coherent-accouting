package com.example.display.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.example.display.model.UsersSalesItems;


public interface UsersSalesItemsRepo extends JpaRepository<UsersSalesItems, Long> {
	
//	@Query("SELECT p FROM UsersSalesItems p WHERE p.user.username = :username and p.isVisible = :isVisible")
//	Page<UsersSalesItems> findByUsernameAndIsVisible(@Param("username") String username, Pageable pageable, @Param("isVisible") boolean isVisible);
//	
//	UsersSalesItems findByUserAndSalesItem(User user, SalesItem salesItem);
//	
//	@Query("SELECT p FROM UsersSalesItems p WHERE p.salesItem.id = :id")
//	List<UsersSalesItems> findUsersSalesItemsBySalesItemId(@Param("id") long id);
//
//	
//	@Query("SELECT p FROM UsersSalesItems p WHERE p.salesItem.retailer.retailerUsername = :retailerUsername and p.isVisible = :isVisible and p.user.username = :userUsername")
//	Page<UsersSalesItems> findByIsVisible(@Param("retailerUsername") String retailerUsername, Pageable pageable, @Param("isVisible") boolean isVisible, @Param("userUsername") String userUsername);
//
//	
//	@Query("SELECT p FROM UsersSalesItems p WHERE p.salesItem.retailer.retailerUsername = :retailerUsername and p.isVisible = :isVisible and p.salesItem.saleDate between :fromDate and :toDate and p.user.username = :userUsername")
//	Page<UsersSalesItems> findByRetailerIsVisibleFromDateToDate(@Param("retailerUsername") String retailerUsername, Pageable pageable, @Param("isVisible") boolean isVisible, @Param("fromDate") Date fromDate, @Param("toDate") Date toDate, @Param("userUsername") String userUsername);
//
//	@Query("SELECT p FROM UsersSalesItems p WHERE p.salesItem.retailer.retailerUsername = :retailerUsername and p.isVisible = :isVisible and p.salesItem.saleDate >= :fromDate and p.user.username = :userUsername")
//	Page<UsersSalesItems> findByRetailerIsVisibleFromDate(@Param("retailerUsername") String retailerUsername, Pageable pageable, @Param("isVisible") boolean isVisible, @Param("fromDate") Date fromDate, @Param("userUsername") String userUsername);
//
//	@Query("SELECT p FROM UsersSalesItems p WHERE p.salesItem.retailer.retailerUsername = :retailerUsername and p.isVisible = :isVisible and p.salesItem.saleDate <= :toDate and p.user.username = :userUsername")
//	Page<UsersSalesItems> findByRetailerIsVisibleToDate(@Param("retailerUsername") String retailerUsername, Pageable pageable, @Param("isVisible") boolean isVisible, @Param("toDate") Date toDate, @Param("userUsername") String userUsername);
//	
//	@Query("SELECT p FROM UsersSalesItems p WHERE p.user.username = :userUsername and p.isVisible = :isVisible and p.salesItem.saleDate between :fromDate and :toDate")
//	Page<UsersSalesItems> findByUserIsVisibleTrueFromDateToDate(@Param("userUsername") String userUsername, Pageable pageable, @Param("isVisible") boolean isVisible, @Param("fromDate") Date fromDate, @Param("toDate") Date toDate);
//	
//	@Query("SELECT p FROM UsersSalesItems p WHERE p.user.username = :userUsername and p.isVisible = :isVisible and p.salesItem.saleDate >= :fromDate")
//	Page<UsersSalesItems> findByUserIsVisibleTrueFromDate(@Param("userUsername") String userUsername, Pageable pageable, @Param("isVisible") boolean isVisible, @Param("fromDate") Date fromDate);
//	
//	@Query("SELECT p FROM UsersSalesItems p WHERE p.user.username = :userUsername and p.isVisible = :isVisible and p.salesItem.saleDate <= :toDate")
//	Page<UsersSalesItems> findByUserIsVisibleTrueToDate(@Param("userUsername") String userUsername, Pageable pageable, @Param("isVisible") boolean isVisible, @Param("toDate") Date toDate);
//	
//	
//	@Query("SELECT p FROM UsersSalesItems p WHERE p.user.username = :userUsername and p.salesItem.retailer.retailerUsername = :retailerUsername")
//	List<UsersSalesItems> getUsersSalesItemsByUserAndRetailer(@Param("userUsername") String userUsername, @Param("retailerUsername") String retailerUsername);
	
	
	@Modifying
    @Transactional
	@Query("delete from UsersSalesItems p where p.id IN (SELECT n2.id FROM UsersSalesItems n2 WHERE n2.user.username = :userUsername and n2.salesItem.retailer.retailerUsername = :retailerUsername)")
    void deleteUserSalesItemsByUserUsernameAndRetailerUsername(@Param("userUsername") String userUsername, @Param("retailerUsername") String retailerUsername);
	
	@Modifying
    @Transactional
    @Query("delete from UsersSalesItems p where p.id IN (SELECT n2.id FROM UsersSalesItems n2 WHERE n2.user.username = :userUsername and n2.salesItem.id = :salesItemId)")
    void deleteUserSalesItemsByUserUsernameAndSalesItemId(@Param("userUsername") String userUsername, @Param("salesItemId") Long salesItemId);
	
	
	@Query("SELECT p FROM UsersSalesItems p WHERE p.salesItem.id = :salesItemId")
	List<UsersSalesItems> findUsersSalesItemsBySalesItemId(@Param("salesItemId") Long salesItemId);
	
	@Query("SELECT p FROM UsersSalesItems p where p.salesItem.url = :url")
	List<UsersSalesItems> getUsersSalesItemsBySalesItemUrl(@Param("url") String url);

	
	
}
