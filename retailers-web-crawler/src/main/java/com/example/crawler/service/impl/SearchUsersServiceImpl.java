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

import com.example.crawler.api.RetailerApi;
import com.example.crawler.api.SearchUsersParametersApi;
import com.example.crawler.model.AnonymousProxy;
import com.example.crawler.model.ExternalAccount;
import com.example.crawler.repository.AnonymousProxyRepo;
import com.example.crawler.repository.ExternalAccountRepo;
import com.example.crawler.repository.RetailersHeapRepo;
import com.example.crawler.service.SearchUsersService;
import com.example.crawler.util.CrawlerUtil;
import com.example.crawler.util.EbayDriver;

@Service
public class SearchUsersServiceImpl implements SearchUsersService{
	
	private static final Logger logger = LogManager.getLogger(SearchUsersServiceImpl.class);
	
	private static final int DEFAULT_MAX_FEEDBACK = 160000;
	private static final int DEFAULT_MAX_LISTINGS = 16000;
	
	@Autowired
    private AnonymousProxyRepo anonymousProxyRepo;
	
	@Autowired
    private ExternalAccountRepo externalAccountRepo;

	 
	 @Autowired
	 private RetailersHeapRepo retailersHeapRepo;
	
	@Override
	public Map<String, Set<RetailerApi>> searchUsers(SearchUsersParametersApi searchUsersParametersApi) throws IOException {
		
		String searchWordInput = CrawlerUtil.fixSearchWordForUsers(searchUsersParametersApi.getSearchWord());
		
    	List<AnonymousProxy> allProxies = anonymousProxyRepo.findAll();
    	
    	List<ExternalAccount> allAccountIds = externalAccountRepo.findByAccountType("ebay");
    	String pageNumber = String.valueOf(searchUsersParametersApi.getPageNumber());
    	int randomNumAccountId = ThreadLocalRandom.current().nextInt(1, allAccountIds.size() + 1);
    	ExternalAccount accountId = allAccountIds.get(randomNumAccountId-1);
    	logger.info("Request from external account with AssociateTag: {}", accountId.getAssociateTag());
//    	String randomAccountId = "VasilAta-edf6-43f5-ac5c-f461c3614cd9";
    	String randomAccountId = accountId.getAccountId();
    	String requestId = UUID.randomUUID().toString();
    	EbayDriver driver = new EbayDriver();
    	
        try {
        	String searchWord = java.net.URLEncoder.encode(searchWordInput, "UTF-8");
        	long minFedback = searchUsersParametersApi.getMinFeedback();
        	long maxFeeback = searchUsersParametersApi.getMaxFeedback();
        	if (maxFeeback == 0) {
        		maxFeeback = DEFAULT_MAX_FEEDBACK;
        	}
        	long maxListings = searchUsersParametersApi.getMaxActiveListings();
        	long minListings = searchUsersParametersApi.getMinActiveListings();
        	if (maxListings == 0) {
        		maxListings = DEFAULT_MAX_LISTINGS;
        	}
        	Map<String, Set<RetailerApi>> users = driver.searchUsers(searchWord, minFedback, maxFeeback,minListings, maxListings, retailersHeapRepo, requestId, randomAccountId, pageNumber);
        	Map<String, Set<RetailerApi>> usersForRequest = new HashMap<>();
        	Set<RetailerApi> foundUsers = users.get(requestId);
        	usersForRequest.put(requestId, foundUsers);
    	    users.remove(requestId);
        	return usersForRequest;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
		
	}

}
