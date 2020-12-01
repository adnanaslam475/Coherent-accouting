package com.example.crawler.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.crawler.model.TrackingNumber;

public interface TrackingNumberRepo extends JpaRepository<TrackingNumber, Long> {
	
	
	@Query("SELECT p FROM TrackingNumber p where p.trackingNumber = :trackingNumber and p.user.username = :userUsername")
	TrackingNumber findTrackingNumberForUser(@Param("trackingNumber") String trackingNumber, @Param("userUsername") String userUsername);


}
