package com.example.display.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.display.adapter.RetailerAdapter;
import com.example.display.adapter.reverse.RetailerAdapterReverse;
import com.example.display.api.RetailerApi;
import com.example.display.model.Retailer;
import com.example.display.model.User;
import com.example.display.model.UsersRetailers;
import com.example.display.pagination.PageWrapper;
import com.example.display.repository.LockManager;
import com.example.display.repository.RetailerRepository;
import com.example.display.repository.UserRepository;
import com.example.display.repository.UsersRetailersRepo;
import com.example.display.repository.UsersSalesItemsRepo;
import com.example.display.service.RetailerService;

@Service
public class RetailerServiceImpl implements RetailerService {

	@Autowired
	private RetailerAdapterReverse retailerAdapterReverse;
	
	@Autowired
	private RetailerAdapter retailerAdapter;

	@Autowired
	private UsersRetailersRepo usersRetailersRepo;

	@Autowired
	private UsersSalesItemsRepo usersSalesItemsRepo;

	@Autowired
	private RetailerRepository retailerRepository;

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private LockManager lockManager;

	@Override
	@Transactional
	public Retailer saveRetailer(RetailerApi retailerApi, User user) {

		// lockManager.aquireLock(retailerApi.getRetailerUsername());
		Retailer retailerCheck = retailerRepository.findByRetailerUsername(retailerApi.getRetailerUsername());

		if (retailerCheck == null) {
			Retailer retailer = retailerAdapterReverse.adaptRetailer(null, retailerApi, user);
			return retailerRepository.save(retailer);
		} else if (retailerCheck != null) {
			if (!this.isUserContainsRetailers(retailerCheck.getUsersRetailers(), user)) {
				Retailer retailer = retailerAdapterReverse.adaptRetailer(retailerCheck, retailerApi, user);
				return retailerRepository.save(retailer);
			}
		}
		return retailerCheck;
	}

	@Override
	public boolean saveRetailers(Set<RetailerApi> retailers) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		String username = currentUser.getName();
		User user = userRepository.findByUsername(username);
		for (RetailerApi retailerApi : retailers) {
			long startTime = System.nanoTime();
			saveRetailer(retailerApi, user);
			long endTime = System.nanoTime();

			long duration = (endTime - startTime);
			System.out.println(duration);
		}
		return true;
	}

	private boolean isUserContainsRetailers(List<UsersRetailers> uss, User currentUser) {

		for (UsersRetailers retailer : uss) {
			if (retailer.getUser().getUsername().equals(currentUser.getUsername())) {
				return true;
			}
		}

		return false;
	}

//	private Retailer getRetailerfromUsersRetailers(List<UsersRetailers> uss, String retailerUsername) {
//
//		for (UsersRetailers ret : uss) {
//			if (ret.getRetailer().getRetailerUsername().equals(retailerUsername)) {
//				return ret.getRetailer();
//			}
//		}
//
//		return null;
//	}

	@Override
	public boolean deleteRetailerByUsername(String retailerUsername) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		String userUsername = currentUser.getName();

		usersSalesItemsRepo.deleteUserSalesItemsByUserUsernameAndRetailerUsername(userUsername, retailerUsername);

		usersRetailersRepo.deleteUserRetailersByUserUsernameAndRetailerUsername(userUsername, retailerUsername);

		return true;
	}

	@Override
	public PageWrapper<RetailerApi> listRetailersByPage(Integer pageNumber, Integer pageSize) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		String userUsername = currentUser.getName();
		PageRequest request = new PageRequest(pageNumber - 1, pageSize, Sort.Direction.ASC, "id");
		
		Page<Retailer> retailers = retailerRepository.findByUserUsername(userUsername, request);
		
		List<RetailerApi> list = new ArrayList<>();
		
		for(Retailer retailer : retailers.getContent()) {
			RetailerApi api = retailerAdapter.adaptRetailer(retailer);
			list.add(api);
		}
		
		PageWrapper<RetailerApi> wrapper = new PageWrapper<>(list, retailers.getTotalElements());
		
		return wrapper;
	}

}
