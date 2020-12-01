package com.example.crawler.repository;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;

import com.example.crawler.api.TrackingNumberApi;

@Component
public class TrackingHeapRepo {
	
	private Map<String, Set<TrackingNumberApi>> trackings = new ConcurrentHashMap<>();
	
	public Map<String, Set<TrackingNumberApi>> getTrackings() {
		return trackings;
	}

	public void setTrackings(Map<String, Set<TrackingNumberApi>> trackings) {
		this.trackings = trackings;
	}
	
	public Set<TrackingNumberApi> addTracking(String requestId, TrackingNumberApi tracking) {
		if(trackings.containsKey(requestId)) {
			trackings.get(requestId).add(tracking);
		} else {
			Set<TrackingNumberApi> newRequestItems = new HashSet<>();
			newRequestItems.add(tracking);
			trackings.put(requestId, newRequestItems);
		}
		return trackings.get(requestId);
	}
  
}
