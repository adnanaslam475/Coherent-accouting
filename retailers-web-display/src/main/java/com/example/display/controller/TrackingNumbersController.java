package com.example.display.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import com.example.display.api.TrackingNumberApi;
import com.example.display.model.TrackingNumber;
import com.example.display.pagination.PageWrapper;
import com.example.display.service.TrackingNumbersService;

/**
 * Created by fan.jin on 2016-10-15.
 */

@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class TrackingNumbersController {

	public static final Logger logger = LoggerFactory.getLogger(TrackingNumbersController.class);

	@Autowired
	private TrackingNumbersService trackingNumbersService;
	
	@RequestMapping(method = RequestMethod.POST, value = "/tracking-numbers/create")
	public ResponseEntity<Void> addTrackingNumber(@RequestBody TrackingNumberApi trackingNumberApi, UriComponentsBuilder ucBuilder) {
		logger.info("Creating Tracking number : {}", trackingNumberApi.toString());
		TrackingNumber trackingNumber = trackingNumbersService.saveTrackingNumber(trackingNumberApi);
		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(ucBuilder.path("/api/tracking-numbers/{trackingNumberId}").buildAndExpand(trackingNumber.getId()).toUri());
		return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
	}
	
	@RequestMapping(method = RequestMethod.DELETE, value = "/tracking-numbers/delete/{id}")
	public ResponseEntity<Void> deleteTrackingNumber(@PathVariable Long id) {
		logger.info("Deleting trackingNumber with id {}", id);  
		trackingNumbersService.deleteTrackingNumberById(id);
	    return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/tracking-numbers/list/{pageNumber}/{pageSize}")
	public ResponseEntity<PageWrapper<TrackingNumberApi>> listTrackingNumbers(@PathVariable("pageNumber") Integer pageNumber, @PathVariable("pageSize") Integer pageSize) {
		logger.info("Selecting SalesItems for page: {}", pageNumber);
		PageWrapper<TrackingNumberApi> salesItems = trackingNumbersService.listTrackingNumbersByPage(pageNumber, pageSize);
		return new ResponseEntity<PageWrapper<TrackingNumberApi>>(salesItems, HttpStatus.OK);
	}
	
	

}
