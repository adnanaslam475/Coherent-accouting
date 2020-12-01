package com.example.crawler.service;

import java.util.Map;
import java.util.Set;

import com.example.crawler.api.TrackingNumberApi;

public interface SearchTrackingNumbersService {
	
	Boolean searchTrackings(String startNumber, String userUsername);
	
	 Map<Boolean, Map<String, Set<TrackingNumberApi>>> searchTrackingsViaXML(String startNumber, String userUsername);
}
