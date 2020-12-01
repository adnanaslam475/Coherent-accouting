package com.example.crawler.repository;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;

import com.example.crawler.api.RetailerApi;

@Component
public class RetailersHeapRepo {
	
	private Map<String, Set<RetailerApi>> retailers = new ConcurrentHashMap<>();

	public Map<String, Set<RetailerApi>> getRetailers() {
		return retailers;
	}

	public void setRetailers(Map<String, Set<RetailerApi>> retailers) {
		this.retailers = retailers;
	}
	
	public Set<RetailerApi> addRetailer(String requestId, RetailerApi retailer) {
		if(retailers.containsKey(requestId)) {
			retailers.get(requestId).add(retailer);
		} else {
			Set<RetailerApi> newRequestItems = new HashSet<>();
			newRequestItems.add(retailer);
			retailers.put(requestId, newRequestItems);
		}
		return retailers.get(requestId);
	}


}
