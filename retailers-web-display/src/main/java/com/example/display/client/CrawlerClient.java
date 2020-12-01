package com.example.display.client;

import java.util.Map;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.example.display.api.RetailerApi;
import com.example.display.api.SalesItemApi;
import com.example.display.api.SearchItemsParametersApi;
import com.example.display.api.SearchRetailersParameterApi;
import com.example.display.api.TrackingNumberApi;

@Component
public class CrawlerClient {

	public static final String CRAWLER_SERVICE_URL = "http://retailers-web-crawler";
	public static final String PRODUCER_CONTEXT = "/crawler";
	public static final String CONTROLLER = "/api";

	@Autowired
	private RestTemplate restTemplate;

	// public List<SearchUsersparameterApi> searchUsers(SearchUsersparameterApi
	// searchUsers) {
	//
	// String serviceUrl = CRAWLER_SERVICE_URL + CONTROLLER;
	// ResponseEntity<List<SearchUsersparameterApi>> responseEntity =
	// restTemplate.exchange(serviceUrl + "/",
	// HttpMethod.POST, new HttpEntity<>(searchUsers), new
	// ParameterizedTypeReference<List<SearchUsersparameterApi>>() {});
	// List<SearchUsersparameterApi> accounts = responseEntity.getBody();
	// return accounts;
	//
	// }

	public Map<String, Set<RetailerApi>> searchRetailers(SearchRetailersParameterApi searchRetailers) {

		String serviceUrl = CRAWLER_SERVICE_URL + PRODUCER_CONTEXT + CONTROLLER + "/search-users";
		ResponseEntity<Map<String, Set<RetailerApi>>> responseEntity = restTemplate.exchange(serviceUrl, HttpMethod.POST,
				new HttpEntity<>(searchRetailers), new ParameterizedTypeReference<Map<String, Set<RetailerApi>>>() {});
		Map<String, Set<RetailerApi>> retailers = responseEntity.getBody();
		return retailers;
	}

	public Map<String, Set<SalesItemApi>> searchItems(SearchItemsParametersApi searchItems) {

		String serviceUrl = CRAWLER_SERVICE_URL + PRODUCER_CONTEXT + CONTROLLER + "/search-items";
		ResponseEntity<Map<String, Set<SalesItemApi>>> responseEntity = restTemplate.exchange(serviceUrl, HttpMethod.POST,
				new HttpEntity<>(searchItems), new ParameterizedTypeReference<Map<String, Set<SalesItemApi>>>() {
				});
		Map<String, Set<SalesItemApi>> items = responseEntity.getBody();
		return items;
	}
	
	public Map<String, Set<SalesItemApi>> searchItemsFirst(SearchItemsParametersApi searchItems) {

		String serviceUrl = CRAWLER_SERVICE_URL + PRODUCER_CONTEXT + CONTROLLER + "/search-items-first";
		ResponseEntity<Map<String, Set<SalesItemApi>>> responseEntity = restTemplate.exchange(serviceUrl, HttpMethod.POST,
				new HttpEntity<>(searchItems), new ParameterizedTypeReference<Map<String, Set<SalesItemApi>>>() {
				});
		Map<String, Set<SalesItemApi>> items = responseEntity.getBody();
		return items;
	}
	
	public Map<Boolean, Map<String, Set<TrackingNumberApi>>> searchTrackingNumbers(String trackingNumber, String userUsername) {

		String serviceUrl = CRAWLER_SERVICE_URL + PRODUCER_CONTEXT + CONTROLLER + "/search-tracking/" + trackingNumber + "/" + userUsername;
		ResponseEntity<Map<Boolean, Map<String, Set<TrackingNumberApi>>>> responseEntity = restTemplate.exchange(serviceUrl, HttpMethod.POST,
				null, new ParameterizedTypeReference<Map<Boolean, Map<String, Set<TrackingNumberApi>>>>() {
				});
		Map<Boolean, Map<String, Set<TrackingNumberApi>>> items = responseEntity.getBody();
		return items;
	}
}
