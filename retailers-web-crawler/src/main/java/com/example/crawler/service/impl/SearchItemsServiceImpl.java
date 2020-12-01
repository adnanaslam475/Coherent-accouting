package com.example.crawler.service.impl;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.ThreadLocalRandom;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.crawler.api.SalesItemApi;
import com.example.crawler.api.SearchItemsParametersApi;
import com.example.crawler.constants.CrawlerConstants;
import com.example.crawler.model.AnonymousProxy;
import com.example.crawler.model.ExternalAccount;
import com.example.crawler.repository.AnonymousProxyRepo;
import com.example.crawler.repository.ExternalAccountRepo;
import com.example.crawler.repository.ItemsHeapRepo;
import com.example.crawler.repository.LockManager;
import com.example.crawler.repository.RetailerRepository;
import com.example.crawler.repository.SalesItemRepo;
import com.example.crawler.repository.UserRepository;
import com.example.crawler.repository.UsersSalesItemsRepo;
import com.example.crawler.service.SearchItemsService;
import com.example.crawler.threads.TaskItems;
import com.example.crawler.util.CrawlerUtil;


@Service
@Transactional
public class SearchItemsServiceImpl implements SearchItemsService {
	
	private static final int DEFAULT_MAX_SOLD_ITEMS = 160000;
	private static final int DEFAULT_MAX_DATE_RANGE = 30;

	private static final Logger logger = LogManager.getLogger(SearchItemsServiceImpl.class);
	
	@Autowired
	private ItemsHeapRepo itemsHeapRepo;
	
	@Autowired
	private TaskItems taskItems;
	
	@Autowired
	private LockManager lockManager;
	
	@Autowired
	private UsersSalesItemsRepo usersSalesItemsRepo;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RetailerRepository retailerRepository;
	
	@Autowired
	private SalesItemRepo salesItemRepo;
	
	@Autowired
	private AnonymousProxyRepo anonymousProxyRepo;
	
	@Autowired
	private ExternalAccountRepo externalAccountRepo;

	@Override
	public Map<String, Set<SalesItemApi>> searchItems(SearchItemsParametersApi searchItemsParametersApi)
			throws IOException, InterruptedException {
		
		List<ExternalAccount> allAccountIds = externalAccountRepo.findByAccountType("amazon");

		List<AnonymousProxy> allProxies = anonymousProxyRepo.findAll();
		String pageNumber = String.valueOf(searchItemsParametersApi.getPageNumber());
		
		int randomNumAccountId = ThreadLocalRandom.current().nextInt(1, allAccountIds.size() + 1);
    	ExternalAccount accountId = allAccountIds.get(randomNumAccountId - 1);
    	logger.info("Request from external account with AssociateTag: {}", accountId.getAssociateTag());
		String retailer = searchItemsParametersApi.getRetailerUserName();
		
		String retailerUserName = searchItemsParametersApi.getRetailerUserName();
		long minItemsSold = searchItemsParametersApi.getMinItemsSold();
		int saleDateRange = searchItemsParametersApi.getSaleDateRange();
		long maxItemsSold = searchItemsParametersApi.getMaxItemsSold();
		
		
		if(maxItemsSold == 0 ) {
			maxItemsSold = DEFAULT_MAX_SOLD_ITEMS;
		}
		if(saleDateRange == 0 ) {
			saleDateRange = DEFAULT_MAX_DATE_RANGE;
		}
		String requestId = UUID.randomUUID().toString();
		String urlWithSoldItems = CrawlerUtil.getretailerURLforSoldItems(retailerUserName, pageNumber);
		Map<String, Set<SalesItemApi>> itemsResponse = taskItems.searchItemsFromCompletedListingsUrl(urlWithSoldItems,
				minItemsSold, maxItemsSold, saleDateRange, itemsHeapRepo, requestId, usersSalesItemsRepo, lockManager, retailer, salesItemRepo, allProxies,accountId);

		Map<String, Set<SalesItemApi>> itemsForRequest = new HashMap<>();
		Set<SalesItemApi> foundItems = itemsResponse.get(requestId);
		itemsForRequest.put(requestId, foundItems);
		itemsResponse.remove(requestId);
		return itemsForRequest;
	}
	
	@Override
	public Map<String, Set<SalesItemApi>> searchItemsFirst(SearchItemsParametersApi searchItemsParametersApi)
			throws IOException, InterruptedException {
		String pageNumber = String.valueOf(searchItemsParametersApi.getPageNumber());
		String retailerUserName = searchItemsParametersApi.getRetailerUserName();
		String requestId = UUID.randomUUID().toString();
		String urlWithSoldItems = CrawlerUtil.getretailerURLforSoldItems(retailerUserName, pageNumber);
		Map<String, Set<SalesItemApi>> itemsResponse = taskItems.searchItemsFromCompletedListingsUrlFirst(urlWithSoldItems, requestId);
		Map<String, Set<SalesItemApi>> itemsForRequest = new HashMap<>();
		Set<SalesItemApi> foundItems = itemsResponse.get(requestId);
		itemsForRequest.put(requestId, foundItems);
		itemsResponse.remove(requestId);
		CrawlerConstants.counter = 0;
		return itemsForRequest;
	}

}
