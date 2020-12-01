package com.example.display.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.util.UriComponentsBuilder;

import com.example.display.api.RetailerApi;
import com.example.display.model.Retailer;
import com.example.display.model.User;
import com.example.display.pagination.PageWrapper;
import com.example.display.repository.UserRepository;
import com.example.display.service.RetailerService;


@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class RetailerController {

	public static final Logger logger = LoggerFactory.getLogger(UserController.class);

	@Autowired
	private RetailerService retailerService;

	@Autowired
	private UserRepository userRepository;

	@RequestMapping(method = RequestMethod.POST, value = "/retailer/create")
	public ResponseEntity<Void> addRetailer(@RequestBody RetailerApi retailerApi, UriComponentsBuilder ucBuilder,
			WebRequest request, HttpServletRequest servletRequest) {
		logger.info("Creating Retailer : {}", retailerApi.toString());
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		String username = currentUser.getName();

		User user = userRepository.findByUsername(username);
		Retailer retailer = this.retailerService.saveRetailer(retailerApi, user);
		HttpHeaders headers = new HttpHeaders();
		headers.setLocation(ucBuilder.path("/api/retailer/{retailerId}").buildAndExpand(retailer.getId()).toUri());
		return new ResponseEntity<Void>(headers, HttpStatus.CREATED);
	}

	@RequestMapping(method = RequestMethod.DELETE, value = "/retailer/delete/{retailerUsername:.+}")
	public ResponseEntity<Void> deleteByRetailerUsername(@PathVariable String retailerUsername) {
		logger.info("Deleting Retailer with username {}", retailerUsername);
		retailerService.deleteRetailerByUsername(retailerUsername);
		return new ResponseEntity<Void>(HttpStatus.NO_CONTENT);
	}
	
	@RequestMapping(method = RequestMethod.GET, value = "/retailer/list/{pageNumber}/{pageSize}")
	public ResponseEntity<PageWrapper<RetailerApi>> listRetailers(@PathVariable("pageNumber") Integer pageNumber, @PathVariable("pageSize") Integer pageSize) {
		logger.info("Selecting Retailers for page: {}", pageNumber);
		PageWrapper<RetailerApi> retailers = retailerService.listRetailersByPage(pageNumber, pageSize);
		return new ResponseEntity<PageWrapper<RetailerApi>>(retailers, HttpStatus.OK);
	}

}
