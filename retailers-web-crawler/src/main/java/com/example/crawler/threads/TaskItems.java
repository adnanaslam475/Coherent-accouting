package com.example.crawler.threads;

import java.io.IOException;

import java.util.ArrayList;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;

import java.util.Map;

import java.util.Set;
import java.util.concurrent.Callable;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.stereotype.Component;

import com.example.crawler.api.SalesItemApi;
import com.example.crawler.constants.CrawlerConstants;
import com.example.crawler.model.AnonymousProxy;
import com.example.crawler.model.ExternalAccount;
import com.example.crawler.repository.ItemsHeapRepo;
import com.example.crawler.repository.LockManager;
import com.example.crawler.repository.SalesItemRepo;
import com.example.crawler.repository.UsersSalesItemsRepo;

@Component
public class TaskItems {

	private static final Logger logger = LogManager.getLogger(TaskItems.class);
	
	public TaskItems() {
		
	}
	
	private Map<String,String> convertElementtoArayListIds(Elements links) {
		Map<String,String> convertedLinks = new HashMap<>();
		for (Element el : links) {
			String href = el.attr("href");
			String id = href.substring(href.lastIndexOf("/") + 1, href.indexOf("?"));
			String idUrl = CrawlerConstants.URL_SOLD_LISTINGS + id;
			String itemUrl = CrawlerConstants.URL_EBAY_ITEMS + id;
			convertedLinks.put(idUrl,itemUrl);
		}
		return convertedLinks;
	}
	
//	private Map<Integer,String>getOnlyRepeatbleElementsCaptcha(Elements links) throws IOException {
//		List<String> convertedLinksForCheckNumbers = convertElementtoArayList(links);
//		Map<Integer,String> wantedUrlsItemsCaptcha = new HashMap<Integer,String>();
//		try {
//			for (String el : convertedLinksForCheckNumbers) {
////				userDao.findByUsername("peshko");
//				Document document = Jsoup.connect(el).timeout(10*1000).get();
//				String occurrencesString = document.select("span.vi-qty-pur-lnk").text();
//				String occurrencesStringHotHour = document.select("span.vi-qtyS-hot-red").text();
//				String occurrencesStringHot = document.select("span.vi-qtyS-hot").text();
//				if(!occurrencesString.equals("")){
//					int occurrences = Integer.parseInt(occurrencesString.substring(0, occurrencesString.indexOf(" sold")).replace(",", ""));
//					if (occurrences >=100 /*ItemsTabController.MINIMUM_TIMES_SOLD*/) {
//						String urlForCheckElement = document.select(CrawlerConstants.SELECTOR_HREF_OFFER_DATE).attr("href");
//						if (!listRepeatableLinks.contains(urlForCheckElement)) {
//							listRepeatableLinks.add(urlForCheckElement);
//							wantedUrlsItemsCaptcha.put(occurrences, urlForCheckElement);
//						}
//					}
//				} 
//				if(!occurrencesStringHotHour.equals("")||!occurrencesStringHot.equals("")){
//					String urlForCheckElement = document.select(CrawlerConstants.SELECTOR_HREF_OFFER_DATE).attr("href");
//					if (!listRepeatableLinks.contains(urlForCheckElement)) {
//						listRepeatableLinks.add(urlForCheckElement);
//						wantedUrlsItemsCaptcha.put(50/*ItemsTabController.MINIMUM_TIMES_SOLD*/, urlForCheckElement);
//					}
//				}
//			}
//		} catch (Exception e) {
//			// TODO: handle exception
//		}
//		
//		return wantedUrlsItemsCaptcha;
//
//	}
//	public static boolean stringContainsItemFromList(String inputStr, String[] items) {
//	    return Arrays.stream(items).parallel().anyMatch(inputStr::contains);
//	}
	
	
	
	
	
	public Map<String,Set<SalesItemApi>> searchItemsFromCompletedListingsUrl(String urlSoldCompletedListing, long minItemsSold, long maxItemsSold, int saleDateRange, ItemsHeapRepo itemsHeapRepo,String requestId, UsersSalesItemsRepo usersSalesItemsRepo, LockManager lockManager,
			 String retailer, SalesItemRepo salesItemRepo, List<AnonymousProxy> allProxies,ExternalAccount accountId) throws InterruptedException {
		logger.info("Request from requestId: {}, for retailer: {}", requestId, retailer);
		try {
			Document document = Jsoup.connect(urlSoldCompletedListing).userAgent("Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:25.0) Gecko/20100101 Firefox/25.0").timeout(5*1000).get();
			Elements links = document.select("a.vip");
			Map<String,String> allListingIdsUrlAndItemUrl = convertElementtoArayListIds(links);
			ExecutorService executorUsers = Executors.newFixedThreadPool(7);
        	List<Callable<Object>> tasks = new ArrayList<Callable<Object>>();
        	int counter = 0;
			for (Map.Entry<String, String> entry : allListingIdsUrlAndItemUrl.entrySet()) {
				String urlTabaleSold = entry.getKey();
				String urlItem = entry.getValue();
				AnonymousProxy proxy = allProxies.get(counter);
				logger.info("Request from AnonymousProxy Host: {}, and post: {}", proxy.getHost(), proxy.getPort());
				
				Runnable worker = new TaskItemsFilterFromTable(urlTabaleSold, minItemsSold, maxItemsSold, saleDateRange, itemsHeapRepo,requestId,
						urlItem, usersSalesItemsRepo, lockManager, retailer, salesItemRepo, proxy,accountId);
				tasks.add(Executors.callable(worker));
				if(counter < allProxies.size()-1 ){
					counter ++;
				} else {
					counter = 0;
				}
			}
			executorUsers.invokeAll(tasks);
        	executorUsers.shutdown();
		} catch (IOException e) {
			logger.error("JSOUP could not parse Document: {}", urlSoldCompletedListing);
			logger.error("IOException: {}", e.getMessage());
		}
		return itemsHeapRepo.getSalesItems();
	}
	
	private Set<SalesItemApi> convertToApiItems(Document document){
		Elements links = document.select("li.sresult");
		Set<SalesItemApi> allApis =new HashSet<>();
		for (Element el : links) {
			SalesItemApi api = new SalesItemApi();
			String href = el.child(0).child(0).child(0).attr("href");
			String image = el.child(0).child(0).child(0).child(0).attr("src");
			String title = el.child(1).text();
			api.setUrl(href);
			api.setPicture(image);
			api.setItemTitle(title);
			allApis.add(api);
		}
		return allApis;
	}
	
	public Map<String,Set<SalesItemApi>> searchItemsFromCompletedListingsUrlFirst(String urlSoldCompletedListing,String requestId) throws InterruptedException {
		Map<String,Set<SalesItemApi>> allForRsposnse = new ConcurrentHashMap<>();
		try {
			Document document = Jsoup.connect(urlSoldCompletedListing).userAgent("Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:25.0) Gecko/20100101 Firefox/25.0").timeout(5*1000).get();
			Set<SalesItemApi> all = convertToApiItems(document);
			allForRsposnse.put(requestId, all);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return allForRsposnse;
	}
	
	
	
	
//	
//	@Transactional
//	private synchronized void saveActionItem (SalesItem item, User currentUser, Retailer retailer) {
//		
//		if (item != null && !item.getItemTitle().equals("")) {	
//			lockManager.aquireLock(item);
//			List<UsersSalesItems> uss = usersSalesItemsRepo.getUsersSalesItemsByItemUrl(item.getUrl());
//			
//			
//			if (uss != null && uss.size() > 0) {
//				
//				if(!CrawlerUtil.isUserContainsSalesItem(uss, currentUser)){
//					
//					SalesItem checkSalesItem = CrawlerUtil.getSalesItemfromUserSalesItems(uss, item);
//					UsersSalesItems usersSalesItem = new UsersSalesItems();
//					
//					usersSalesItem.setSalesItem(checkSalesItem);
//					checkSalesItem.addUserSalesItem(usersSalesItem);
//					usersSalesItem.setUser(currentUser);
//					HeapContainer.allDataBaseSalesItems.add(usersSalesItem);
//					usersSalesItem.setVisible(true);
//					saveSalesItemToDataBase(checkSalesItem);
//				}
//				
//			} else {
//				UsersSalesItems usersSalesItem = new UsersSalesItems();
//				usersSalesItem.setSalesItem(item);
//				usersSalesItem.setUser(currentUser);
//				usersSalesItem.setVisible(true);
//				item.setRetailer(retailer);
//				item.addUserSalesItem(usersSalesItem);
//				HeapContainer.allDataBaseSalesItems.add(usersSalesItem);
//				
//				saveSalesItemToDataBase(item);
//
//			}
//		}
//	}
//	
//	private void saveSalesItemToDataBase(SalesItem salesItem)  {
//
//		if (salesItem != null) {
//			salesItemDao.save(salesItem);
//		}
//
//	}

}

