package com.example.crawler.controller;

import java.io.IOException;
import java.util.Map;
import java.util.Set;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.example.crawler.api.SalesItemApi;
import com.example.crawler.api.SearchItemsParametersApi;
import com.example.crawler.service.SearchItemsService;


/**
 * Created by fan.jin on 2016-10-15.
 */

@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class SearchItemsController {
	
	private static final Logger logger = LogManager.getLogger(SearchItemsController.class);

  	@Autowired
	private SearchItemsService searchItemsService;

	 @RequestMapping(method = RequestMethod.POST, value = "/search-items")
	  public ResponseEntity< Map<String, Set<SalesItemApi>>> searchItems(@RequestBody SearchItemsParametersApi searchItemsParametersApi) throws IOException, InterruptedException {
		logger.info("Input ParametersInput Parameters: {}", searchItemsParametersApi.toString());
		 Map<String, Set<SalesItemApi>> allItems = this.searchItemsService.searchItems(searchItemsParametersApi);
	    //HttpHeaders headers = new HttpHeaders();
	    return new ResponseEntity< Map<String, Set<SalesItemApi>>>(allItems, HttpStatus.OK);
	  }
	 
	 @RequestMapping(method = RequestMethod.POST, value = "/search-items-first")
	  public ResponseEntity< Map<String, Set<SalesItemApi>>> searchItemsFirst(@RequestBody SearchItemsParametersApi searchItemsParametersApi) throws IOException, InterruptedException {
		logger.debug("Input ParametersInput Parameters: {}", searchItemsParametersApi.toString());
		 Map<String, Set<SalesItemApi>> allItems = this.searchItemsService.searchItemsFirst(searchItemsParametersApi);
	    //HttpHeaders headers = new HttpHeaders();
	    return new ResponseEntity< Map<String, Set<SalesItemApi>>>(allItems, HttpStatus.OK);
	  }
}
