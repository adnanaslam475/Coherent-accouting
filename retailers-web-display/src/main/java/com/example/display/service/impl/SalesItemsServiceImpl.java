package com.example.display.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.display.adapter.SalesItemAdapter;
import com.example.display.adapter.reverse.SalesItemAdapterReverse;
import com.example.display.api.RetailerApi;
import com.example.display.api.SalesItemApi;
import com.example.display.model.Retailer;
import com.example.display.model.SalesItem;
import com.example.display.model.User;
import com.example.display.model.UsersSalesItems;
import com.example.display.pagination.PageWrapper;
import com.example.display.repository.LockManager;
import com.example.display.repository.RetailerRepository;
import com.example.display.repository.SalesItemRepo;
import com.example.display.repository.UserRepository;
import com.example.display.repository.UsersSalesItemsRepo;
import com.example.display.service.RetailerService;
import com.example.display.service.SalesItemsService;

@Service
public class SalesItemsServiceImpl implements SalesItemsService {

	public static final Logger logger = LoggerFactory.getLogger(SalesItemsServiceImpl.class);

	@Autowired
	private UsersSalesItemsRepo usersSalesItemsRepo;

	@Autowired
	private SalesItemRepo salesItemRepo;

	@Autowired
	private LockManager lockManager;

	@Autowired
	private SalesItemAdapterReverse salesItemAdapterReverse;

	@Autowired
	private SalesItemAdapter salesItemAdapter;

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RetailerRepository retailerRepository;
	
	@Autowired
	private RetailerService retailerService;

	@Override
	public boolean deleteSalesItemById(Long salesItemId) {

		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		String userUsername = currentUser.getName();

		usersSalesItemsRepo.deleteUserSalesItemsByUserUsernameAndSalesItemId(userUsername, salesItemId);

		return true;
	}

	@Override
	@Transactional
	public SalesItem saveSalesItem(SalesItemApi salesItemApi) {

		// lockManager.aquireLock(retailerApi.getRetailerUsername());
		
		Retailer retailer = retailerRepository.findByRetailerUsername(salesItemApi.getRetailer());
		if(retailer == null) {
			saveNonexistingRetailer(salesItemApi.getRetailer());
		}
		
		if (StringUtils.isNotBlank(salesItemApi.getUrl())) {
			SalesItem itemCheck = salesItemRepo.findByUrl(salesItemApi.getUrl());
			
			Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
			String username = currentUser.getName();
			
			if (itemCheck == null) {
				SalesItem salesItem = salesItemAdapterReverse.adaptSalesItem(null, salesItemApi, username);
				return salesItemRepo.save(salesItem);
			} else if (itemCheck != null) {
				if (!this.isUserContainsSalesItem(itemCheck.getUsersSalesItems(), username)) {
					SalesItem item = salesItemAdapterReverse.adaptSalesItem(itemCheck, salesItemApi, username);
					return salesItemRepo.save(item);
				}
			}
			return itemCheck;
		}
		return null;

	}

	private boolean isUserContainsSalesItem(List<UsersSalesItems> uss, String username) {

		for (UsersSalesItems retailer : uss) {
			if (retailer.getUser().getUsername().equals(username)) {
				return true;
			}
		}

		return false;
	}
	
	private Retailer saveNonexistingRetailer(String retailerUsername) {
		Retailer saved = null;
		if(StringUtils.isNotBlank(retailerUsername)) {
			RetailerApi api = new RetailerApi();
			api.setRetailerUsername(retailerUsername);
			api.setUrl(FileUploadServiceImpl.RETAILER_URL + retailerUsername);
			Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
			String username = currentUser.getName();
			User user = userRepository.findByUsername(username);
			saved = retailerService.saveRetailer(api, user);
		}
		return saved;
	}

	// private SalesItem getSalesItemFromUsersRetailers(List<UsersSalesItems> uss,
	// String salesItemUrl) {
	//
	// for (UsersSalesItems ret : uss) {
	// if (ret.getSalesItem().getUrl().equals(salesItemUrl)) {
	// return ret.getSalesItem();
	// }
	// }
	//
	// return null;
	// }

	@Override
	public PageWrapper<SalesItemApi> listSalesItemsByPage(Integer pageNumber, Integer pageSize) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		String userUsername = currentUser.getName();
		PageRequest request = new PageRequest(pageNumber - 1, pageSize, Sort.Direction.ASC, "id");

		Page<SalesItem> salesItems = salesItemRepo.findSalesItemsByPagePerUser(userUsername, request);

		List<SalesItemApi> list = new ArrayList<>();

		for (SalesItem salesItem : salesItems.getContent()) {
			SalesItemApi api = salesItemAdapter.adaptSalesItem(salesItem);
			list.add(api);
		}

		PageWrapper<SalesItemApi> wrapper = new PageWrapper<>(list, salesItems.getTotalElements());

		return wrapper;
	}

	@Override
	public PageWrapper<SalesItemApi> listSalesItemsByPagePerRetailer(String retailerUsername, Integer pageNumber, Integer pageSize) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		String userUsername = currentUser.getName();
		PageRequest request = new PageRequest(pageNumber - 1, pageSize, Sort.Direction.ASC, "id");

		Page<SalesItem> salesItems = salesItemRepo.findSalesItemsByPagePerUserPerRetailer(retailerUsername, userUsername, request);

		List<SalesItemApi> list = new ArrayList<>();

		for (SalesItem salesItem : salesItems.getContent()) {
			SalesItemApi api = salesItemAdapter.adaptSalesItem(salesItem);
			list.add(api);
		}

		PageWrapper<SalesItemApi> wrapper = new PageWrapper<>(list, salesItems.getTotalElements());

		return wrapper;
	}
}
