package com.example.display.controller;

import javax.servlet.http.HttpServletRequest;

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
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.util.UriComponentsBuilder;

import com.example.display.api.SalesItemApi;
import com.example.display.model.SalesItem;
import com.example.display.pagination.PageWrapper;
import com.example.display.service.SalesItemsService;

@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class SalesItemsController {

	public static final Logger logger = LoggerFactory.getLogger(SalesItemsController.class);

	@Autowired
	private SalesItemsService salesItemsService;
	
	@RequestMapping(method = RequestMethod.POST, value = "/item/create")
	public ResponseEntity<Void> addUser(@RequestBody SalesItemApi salesItemApi, UriComponentsBuilder ucBuilder,
			WebRequest request, HttpServletRequest servletRequest) {
		logger.info("Creating SalesItem : {}", salesItemApi.toString());

		SalesItem salesItem = this.salesItemsService.saveSalesItem(salesItemApi);
		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(ucBuilder.path("/api/item/{salesItemId}").buildAndExpand(salesItem.getId()).toUri());
		return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/item/delete/{salesItemId}")
	public ResponseEntity<Void> deleteByRetailerUsername(@PathVariable("salesItemId") Long salesItemId) {
		logger.info("Deleting Retailer with username {}", salesItemId);
		salesItemsService.deleteSalesItemById(salesItemId);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/item/list/{pageNumber}/{pageSize}")
	public ResponseEntity<PageWrapper<SalesItemApi>> listSalesItems(@PathVariable("pageNumber") Integer pageNumber, @PathVariable("pageSize") Integer pageSize) {
		logger.info("Selecting SalesItems for page: {}", pageNumber);
		PageWrapper<SalesItemApi> salesItems = salesItemsService.listSalesItemsByPage(pageNumber, pageSize);
		return new ResponseEntity<PageWrapper<SalesItemApi>>(salesItems, HttpStatus.OK);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/item/list/{retailerUsername}/{pageNumber}/{pageSize}")
	public ResponseEntity<PageWrapper<SalesItemApi>> listSalesItemsPerRetailer(@PathVariable("retailerUsername") String retailerUsername, @PathVariable("pageNumber") Integer pageNumber, @PathVariable("pageSize") Integer pageSize) {
		logger.info("Selecting SalesItems for {} for page: {}", retailerUsername, pageNumber);
		PageWrapper<SalesItemApi> salesItems = salesItemsService.listSalesItemsByPagePerRetailer(retailerUsername, pageNumber, pageSize);
		return new ResponseEntity<PageWrapper<SalesItemApi>>(salesItems, HttpStatus.OK);
	}

}
