package com.example.crawler.controller;


import java.util.Map;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.crawler.api.TrackingNumberApi;
import com.example.crawler.service.SearchTrackingNumbersService;


/**
 * Created by fan.jin on 2016-10-15.
 */

@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class SearchTrackingNumbersController {
	
  public static final Logger logger = LoggerFactory.getLogger(SearchTrackingNumbersController.class);

  	@Autowired
	private SearchTrackingNumbersService searchTrackingNumbersService;

	 @RequestMapping(method = RequestMethod.POST, value = "/search-tracking/{trackingNumber}/{userUsername:.+}")
	  public ResponseEntity< Map<Boolean, Map<String, Set<TrackingNumberApi>>>> searchUsers(@PathVariable("trackingNumber") String trackingNumber, @PathVariable("userUsername") String userUsername) {
		logger.info("Searching Tracking {} for user: {}", trackingNumber, userUsername);
		 Map<Boolean, Map<String, Set<TrackingNumberApi>>> allTrackings = this.searchTrackingNumbersService.searchTrackingsViaXML(trackingNumber, userUsername);
	    return new ResponseEntity<Map<Boolean, Map<String, Set<TrackingNumberApi>>>>(allTrackings, HttpStatus.OK);
	  }
}
