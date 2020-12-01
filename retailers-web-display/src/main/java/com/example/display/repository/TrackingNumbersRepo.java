package com.example.display.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.example.display.model.TrackingNumber;

public interface TrackingNumbersRepo extends JpaRepository<TrackingNumber, Long> {
	
	@Query("SELECT p FROM TrackingNumber p where p.user.username = :userUsername and p.trackingNumber = :trackingNumber")
	TrackingNumber findTrackingNumberByUserUsernameAndTrackingNumber(@Param("userUsername") String userUsername, @Param("trackingNumber") String trackingNumber);

	@Query("SELECT p FROM TrackingNumber p WHERE p.user.username = :username")
	Page<TrackingNumber> findByUserUsername(@Param("username") String username, Pageable pageable);
	
	@Query("SELECT p FROM TrackingNumber p where p.trackingNumber = :trackingNumber and p.user.username = :userUsername")
	TrackingNumber findTrackingNumberForUser(@Param("trackingNumber") String trackingNumber, @Param("userUsername") String userUsername);

	
}

