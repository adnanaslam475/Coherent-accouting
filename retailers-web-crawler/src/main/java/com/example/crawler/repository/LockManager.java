package com.example.crawler.repository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.crawler.model.SalesItem;
import com.example.crawler.model.UsersRetailers;
import com.example.crawler.model.UsersSalesItems;


@Service("lockManager")
public class LockManager  {
	
	@Autowired
	private LockDao lockDao;
	
	public void aquireLock(String retailerUsername){
		lockDao.aquireLock(generatKey("retailer", retailerUsername));
	}
	
	public void aquireLock(SalesItem salesItem){
		lockDao.aquireLock(generatKey("salesItem", salesItem.getUrl()));
	}
	
	public void aquireLock(UsersRetailers usersRetailers){
		lockDao.aquireLock(generatKey("usersRetailers", usersRetailers.getRetailer().getRetailerUsername()));
	}
	
	public void aquireLock(UsersSalesItems usersSalesItems){
		lockDao.aquireLock(generatKey("usersSalesItems", usersSalesItems.getSalesItem().getUrl()));
	}
	
	private static String generatKey(String ... keys){
		return String.join("/", keys);
	}
	
}
