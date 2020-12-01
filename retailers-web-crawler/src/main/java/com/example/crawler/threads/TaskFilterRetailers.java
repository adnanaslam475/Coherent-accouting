package com.example.crawler.threads;

import com.example.crawler.api.RetailerApi;
import com.example.crawler.constants.CrawlerConstants;
import com.example.crawler.repository.RetailersHeapRepo;
import com.example.crawler.util.EbayDriver;


public class TaskFilterRetailers implements Runnable {

	private String seller;
	
	private long maxListings;
	
	private long ratingFrom;
	
	private long ratingTo;
	
	private long feedbackScore;
	
	private String requestId;
	
	private EbayDriver driver;
	
	private RetailersHeapRepo retailersHeapRepo;
	
	private String accountId;
	
	private long minListings;
	
	private boolean isTopRated;
	
	
	public TaskFilterRetailers(String seller, long minListings, long maxListings, long ratingFrom, long ratingTo,
			long feedbackScore, RetailersHeapRepo retailersHeapRepo, String requestId, String accountId, boolean isTopRated) {
		this.seller = seller;
		this.maxListings = maxListings;
		this.minListings = minListings;
		this.ratingFrom = ratingFrom;
		this.ratingTo = ratingTo;
		this.feedbackScore = feedbackScore;
		this.retailersHeapRepo = retailersHeapRepo;
		this.requestId = requestId;
		this.driver = new EbayDriver();
		this.accountId = accountId;
		this.isTopRated = isTopRated;
	}
	
	public TaskFilterRetailers() {
		
	}

	@Override
	public void run() {
		long sellerListings;
		try {
			if(feedbackScore > ratingFrom && feedbackScore < ratingTo ) {
				//We check here sellerListings to reduce the number of calls to the service
				sellerListings = driver.getUsersListings(seller, accountId);
				if (sellerListings < maxListings && sellerListings > minListings ) {
					RetailerApi retailer = new RetailerApi(seller, CrawlerConstants.URL_EBAY_RETAAILERS + seller, feedbackScore, sellerListings, isTopRated);
					retailersHeapRepo.addRetailer(requestId, retailer);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}


}
