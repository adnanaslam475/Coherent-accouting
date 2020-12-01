package com.example.display.adapter;


import org.springframework.stereotype.Component;

import com.example.display.api.RetailerApi;
import com.example.display.model.Retailer;

@Component
public class RetailerAdapter {
	
	public RetailerApi adaptRetailer(Retailer retailer) {
		
		if(retailer == null) {
			return null;
		}
		
		RetailerApi retailerApi = new RetailerApi();
		retailerApi.setRetailerUsername(retailer.getRetailerUsername());
		retailerApi.setFeedbackScore(retailer.getFeedbackScore());
		retailerApi.setUrl(retailer.getUrl());
		retailerApi.setSellerListings(retailer.getRetailerListings());
		retailerApi.setTopRated(retailer.isTopRated());
		return retailerApi;
		
	}

}
