package com.example.display.adapter;


import org.springframework.stereotype.Component;

import com.example.display.api.SalesItemApi;
import com.example.display.model.SalesItem;
import com.example.display.util.JwtTokenUtil;


@Component
public class SalesItemAdapter {
	
	public SalesItemApi adaptSalesItem(SalesItem salesItem) {
		
		if(salesItem == null) {
			return null;
		}
		
		SalesItemApi salesItemAPI = new SalesItemApi();
		salesItemAPI.setId(salesItem.getId());
		salesItemAPI.setItemTitle(salesItem.getItemTitle());
		salesItemAPI.setPicture(salesItem.getPicture());
		salesItemAPI.setPrice(salesItem.getPrice());
		salesItemAPI.setSaleDate(JwtTokenUtil.getDateAsString(salesItem.getSaleDate()));
		salesItemAPI.setTimesSold(salesItem.getTimesSold());
		salesItemAPI.setUrl(salesItem.getUrl());
		salesItemAPI.setUpc(salesItem.getUpc());
		salesItemAPI.setAmazonPicture(salesItem.getAmazonPicture());
		salesItemAPI.setAmazonPrice(salesItem.getAmazonPrice());
		salesItemAPI.setAmazonUrl(salesItem.getAmazonUrl());
		return salesItemAPI;
	}

}
