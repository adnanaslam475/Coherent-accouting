package com.example.display.controller;

import java.io.IOException;
import java.util.Map;
import java.util.Set;

import org.hibernate.validator.constraints.NotEmpty;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.display.api.RetailerApi;
import com.example.display.api.SalesItemApi;
import com.example.display.api.SearchItemsParametersApi;
import com.example.display.api.SearchRetailersParameterApi;
import com.example.display.api.TrackingNumberApi;
import com.example.display.client.CrawlerClient;


@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class SearchController {
	
  public static final Logger logger = LoggerFactory.getLogger(SearchController.class);

  @Autowired
  private CrawlerClient crawlerClient;

  @RequestMapping(method = RequestMethod.POST, value = "/search-users")
  public ResponseEntity<Map<String, Set<RetailerApi>>> searchRetailers(@RequestBody SearchRetailersParameterApi searchUsersparameterApi) {
	  logger.info("Searching for users keyword {}", searchUsersparameterApi.getSearchWord());
	  Map<String, Set<RetailerApi>> result = crawlerClient.searchRetailers(searchUsersparameterApi);
      return new ResponseEntity<Map<String, Set<RetailerApi>>>(result, HttpStatus.OK);
  }
  
  @RequestMapping(method = RequestMethod.POST, value = "/search-items")
  public ResponseEntity< Map<String, Set<SalesItemApi>>> searchUsers(@RequestBody SearchItemsParametersApi searchItemsParametersApi) throws IOException, InterruptedException {
	logger.info("Input ParametersInput Parameters: {}", searchItemsParametersApi.toString());
	Map<String, Set<SalesItemApi>> allItems = crawlerClient.searchItems(searchItemsParametersApi);
    return new ResponseEntity< Map<String, Set<SalesItemApi>>>(allItems, HttpStatus.OK);
  }
  
  @RequestMapping(method = RequestMethod.POST, value = "/search-tracking")
	public ResponseEntity<Map<Boolean, Map<String, Set<TrackingNumberApi>>>> searchTracking(@RequestBody SearchTrackingsdApi searchTrackingsdApi) {
		logger.info("Searching after tracking number {}", searchTrackingsdApi.getTrackingNumber());
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		String userUsername = currentUser.getName();
		Map<Boolean, Map<String, Set<TrackingNumberApi>>> response = crawlerClient.searchTrackingNumbers(searchTrackingsdApi.getTrackingNumber(), userUsername);
		if(response.get(true) != null) {
			return new ResponseEntity<Map<Boolean, Map<String, Set<TrackingNumberApi>>>>(response, HttpStatus.OK);
		} else {
			return new ResponseEntity<Map<Boolean, Map<String, Set<TrackingNumberApi>>>>(response, HttpStatus.CONFLICT);
		}
		
	}

	@RequestMapping(method = RequestMethod.POST, value = "/search-items-first")
	public ResponseEntity<Map<String, Set<SalesItemApi>>> searchItemsFirst(@RequestBody SearchItemsParametersApi searchItemsParametersApi) {
		logger.info("Input ParametersInput Parameters: {}", searchItemsParametersApi.toString());
		Map<String, Set<SalesItemApi>> allItems = this.crawlerClient.searchItemsFirst(searchItemsParametersApi);
		return new ResponseEntity<Map<String, Set<SalesItemApi>>>(allItems, HttpStatus.OK);
	}

	public static class SearchTrackingsdApi {

		@NotEmpty
		private String trackingNumber;

		public String getTrackingNumber() {
			return trackingNumber;
		}

		public void setTrackingNumber(String trackingNumber) {
			this.trackingNumber = trackingNumber;
		}

	}

}
