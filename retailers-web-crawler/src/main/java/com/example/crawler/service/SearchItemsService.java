package com.example.crawler.service;

import java.io.IOException;
import java.util.Map;
import java.util.Set;

import com.example.crawler.api.SalesItemApi;
import com.example.crawler.api.SearchItemsParametersApi;

 

/**
 * Created by fan.jin on 2016-10-15.
 */
public interface SearchItemsService {
	

	Map<String, Set<SalesItemApi>> searchItems(SearchItemsParametersApi searchItemsParametersApi) throws IOException, InterruptedException;
	Map<String, Set<SalesItemApi>> searchItemsFirst(SearchItemsParametersApi searchItemsParametersApi) throws IOException, InterruptedException;
}
