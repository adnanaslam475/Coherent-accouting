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

import com.example.crawler.api.RetailerApi;
import com.example.crawler.api.SearchUsersParametersApi;
import com.example.crawler.service.SearchUsersService;


/**
 * Created by fan.jin on 2016-10-15.
 */

@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class SearchUsersController {
	 private static final Logger logger = LogManager.getLogger(SearchUsersController.class);
	 @Autowired
	 private SearchUsersService searchUsersService;

	 @RequestMapping(method = RequestMethod.POST, value = "/search-users")
	  public ResponseEntity<Map<String, Set<RetailerApi>>> searchUsers(@RequestBody SearchUsersParametersApi searchUsersParametersApi) throws IOException {
		logger.info("Input ParametersInput Parameters: {}", searchUsersParametersApi.toString());
	    Map<String, Set<RetailerApi>> users = this.searchUsersService.searchUsers(searchUsersParametersApi);
	    HttpHeaders headers = new HttpHeaders();
	    return new ResponseEntity<Map<String, Set<RetailerApi>>>(users, HttpStatus.OK);
	  }

}
