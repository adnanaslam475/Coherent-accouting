package com.example.crawler.repository;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Component;

import com.example.crawler.api.SalesItemApi;

@Component
public class ItemsHeapRepo {

	
	
	private Map<String, Set<SalesItemApi>> salesItems = new ConcurrentHashMap<>();

	
	public Map<String, Set<SalesItemApi>> getSalesItems() {
		return salesItems;
	}


	public void setSalesItems(Map<String, Set<SalesItemApi>> salesItems) {
		this.salesItems = salesItems;
	}
	
	public Set<SalesItemApi> addItem(String requestId, SalesItemApi salesItemApi) {
		if(salesItems.containsKey(requestId)) {
			salesItems.get(requestId).add(salesItemApi);
		} else {
			Set<SalesItemApi> newRequestItems = new HashSet<>();
			newRequestItems.add(salesItemApi);
			salesItems.put(requestId, newRequestItems);
		}
		return salesItems.get(requestId);
	}
}
