package com.example.display.adapter.reverse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.example.display.api.SalesItemApi;
import com.example.display.model.Retailer;
import com.example.display.model.SalesItem;
import com.example.display.model.User;
import com.example.display.model.UsersSalesItems;
import com.example.display.repository.RetailerRepository;
import com.example.display.repository.UserRepository;
import com.example.display.util.JwtTokenUtil;

@Component
public class SalesItemAdapterReverse {
	
	@Autowired
	private RetailerRepository retailerRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	public SalesItem adaptSalesItem(SalesItem salesItem, SalesItemApi salesItemApi, String username) {
		
		if(salesItemApi == null) {
			return null;
		}
		
		Retailer retailer = retailerRepository.findByRetailerUsername(salesItemApi.getRetailer());
		User user = userRepository.findByUsername(username);
		
		if(salesItem == null) {
			salesItem = new SalesItem();
			salesItem.setUrl(salesItemApi.getUrl());
			salesItem.setUpc(salesItemApi.getUpc());
			salesItem.setItemTitle(salesItemApi.getItemTitle());
			salesItem.setPicture(salesItemApi.getPicture());
			salesItem.setRetailer(retailer);
		}
		salesItem.setPrice(salesItemApi.getPrice());
		salesItem.setSaleDate(JwtTokenUtil.adaptToLocalDateTime(salesItemApi.getSaleDate()));
		salesItem.setTimesSold(salesItemApi.getTimesSold());
		salesItem.setAmazonPicture(salesItemApi.getAmazonPicture());
		salesItem.setAmazonUrl(salesItemApi.getAmazonUrl());
		salesItem.setAmazonPrice(salesItemApi.getAmazonPrice());
		UsersSalesItems userItem = new UsersSalesItems();
		salesItem.addUserSalesItem(userItem);
		userItem.setSalesItem(salesItem);
		userItem.setUser(user);
		return salesItem;
	}
	
}
