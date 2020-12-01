package com.example.display.adapter;


import java.time.LocalDateTime;

import org.springframework.stereotype.Component;

import com.example.display.api.TrackingNumberApi;
import com.example.display.model.TrackingNumber;
import com.example.display.util.JwtTokenUtil;

@Component
public class TrackingNumberAdapter {
	
	private static final Integer TRACKING_PERIOD_BACK_IN_DAYS = 50;
	
	private static final Integer DELIVERY_PERIOD_BACK_IN_DAYS = 2;
	
	public TrackingNumberApi adaptTrackingNumber(TrackingNumber trackingNumber) {
		
		if(trackingNumber == null) {
			return null;
		}
		
		TrackingNumberApi trackingNumberApi = new TrackingNumberApi();
		trackingNumberApi.setId(trackingNumber.getId());
		trackingNumberApi.setTrackingNumber(trackingNumber.getTrackingNumber());
		trackingNumberApi.setTrackingStatus(getTrackingStatus(trackingNumber.getShippingDate()));
		trackingNumberApi.setShippingDate(JwtTokenUtil.getDateAsString(trackingNumber.getShippingDate()));
		trackingNumberApi.setShippingState(trackingNumber.getShippingState());
		trackingNumberApi.setShippingCity(trackingNumber.getShippingCity());
		return trackingNumberApi;
	}
	
	private String getTrackingStatus (LocalDateTime shippingDate) {
		LocalDateTime todayMinudFiftyDays = LocalDateTime.now().minusDays(TRACKING_PERIOD_BACK_IN_DAYS);
		if(shippingDate != null) {
			if(shippingDate.plusDays(DELIVERY_PERIOD_BACK_IN_DAYS).isAfter(LocalDateTime.now())) {
				return "Transit";
			} else if (shippingDate.plusDays(DELIVERY_PERIOD_BACK_IN_DAYS).isBefore(LocalDateTime.now())
					&& todayMinudFiftyDays.isAfter(shippingDate)) {
				return "Delivered";
			} else {
				return "Expired";
			}
		} 
		return "Expired";
	}

	
}
