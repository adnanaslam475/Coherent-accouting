package com.example.display.adapter.reverse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.display.api.RetailerApi;
import com.example.display.api.TrackingNumberApi;
import com.example.display.model.Retailer;
import com.example.display.model.TrackingNumber;
import com.example.display.model.User;
import com.example.display.model.UsersRetailers;
import com.example.display.repository.UserRepository;
import com.example.display.util.JwtTokenUtil;

@Component
public class TrackingNumberAdapterReverse {
	
	@Autowired
	private UserRepository userRepository;
	
	public TrackingNumber adaptTrackingNumber(TrackingNumber trackingNumber, TrackingNumberApi trackingNumberApi, String userUsername) {
		
		User user = userRepository.findByUsername(userUsername);
		
		if (trackingNumber == null) {
			trackingNumber = new TrackingNumber();
		}
		trackingNumber.setShippingDate(JwtTokenUtil.adaptToLocalDateTime(trackingNumberApi.getShippingDate()));
		trackingNumber.setShippingState(trackingNumberApi.getShippingState());
		trackingNumber.setShippingCity(trackingNumberApi.getShippingCity());
		trackingNumber.setUser(user);
		
		return trackingNumber;
		
	}
	

}
