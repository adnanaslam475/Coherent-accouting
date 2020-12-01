package com.example.display.adapter.reverse;

import org.springframework.stereotype.Component;

import com.example.display.api.RetailerApi;
import com.example.display.model.Retailer;
import com.example.display.model.User;
import com.example.display.model.UsersRetailers;

@Component
public class RetailerAdapterReverse {
	
	public Retailer adaptRetailer(Retailer retailer, RetailerApi retailerApi, User user) {
		
		if (retailer == null) {
			retailer = new Retailer();
			retailer.setRetailerUsername(retailerApi.getRetailerUsername());
			retailer.setUrl(retailerApi.getUrl());
		}
		retailer.setFeedbackScore(retailerApi.getFeedbackScore());
		retailer.setRetailerListings(retailerApi.getSellerListings());
		retailer.setTopRated(retailerApi.isTopRated());
		UsersRetailers userRetailer = new UsersRetailers();
		retailer.addUserRetailer(userRetailer);
		userRetailer.setRetailer(retailer);
		userRetailer.setUser(user);
		return retailer;
		
	}
	

}
