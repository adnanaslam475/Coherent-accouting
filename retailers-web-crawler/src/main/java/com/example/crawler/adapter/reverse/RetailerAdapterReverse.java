package com.example.crawler.adapter.reverse;

import org.springframework.stereotype.Component;

import com.example.crawler.model.Retailer;
import com.example.crawler.model.User;
import com.example.crawler.model.UsersRetailers;

@Component
public class RetailerAdapterReverse {
	
	public Retailer adaptRetailer(Retailer retailer, String retailerUsername, User user) {
		
		if (retailer == null) {
			retailer = new Retailer();
			retailer.setRetailerUsername(retailerUsername);
			String url = "http://feedback.ebay.com/ws/eBayISAPI.dll?ViewFeedback&userid=" + retailer.getRetailerUsername() + "&iid=172355175764&ssPageName=VIP:feedback&ftab=FeedbackAsSeller&rt=nc&_trksid=p2047675.l2560";
			retailer.setUrl(url);
		}
		UsersRetailers userRetailer = new UsersRetailers();
		retailer.addUserRetailer(userRetailer);
		userRetailer.setRetailer(retailer);
		userRetailer.setUser(user);
		return retailer;
		
	}
	

}
