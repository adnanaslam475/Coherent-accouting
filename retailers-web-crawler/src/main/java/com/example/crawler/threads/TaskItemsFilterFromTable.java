package com.example.crawler.threads;

import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Map.Entry;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.transaction.annotation.Transactional;

import com.example.crawler.api.SalesItemApi;
import com.example.crawler.constants.CrawlerConstants;
import com.example.crawler.model.AnonymousProxy;
import com.example.crawler.model.ExternalAccount;
import com.example.crawler.model.Retailer;
import com.example.crawler.model.SalesItem;
import com.example.crawler.model.User;
import com.example.crawler.model.UsersSalesItems;
import com.example.crawler.repository.ItemsHeapRepo;
import com.example.crawler.repository.LockManager;
import com.example.crawler.repository.SalesItemRepo;
import com.example.crawler.repository.UsersSalesItemsRepo;
import com.example.crawler.util.CrawlerUtil;




public class TaskItemsFilterFromTable implements Runnable {
	
	private static final Logger logger = LogManager.getLogger(TaskItemsFilterFromTable.class);
	
	private String url;
	
	private long minItemsSold;
	
	private long maxItemsSold;
	
	private int saleDateRange;
	
	private String requestId;
	
	private ItemsHeapRepo itemsHeapRepo;
	
	private String urlItem;
	
	private LockManager lockManager;
	
	private UsersSalesItemsRepo usersSalesItemsRepo;
	
	private String retailer;
	
	private SalesItemRepo salesItemRepo;
	
	private AnonymousProxy proxy;
	private ExternalAccount accountId;
	
	public TaskItemsFilterFromTable(String url, long minItemsSold, long maxItemsSold, int saleDateRange, ItemsHeapRepo itemsHeapRepo, String requestId, String urlItem, 
			UsersSalesItemsRepo usersSalesItemsRepo, LockManager lockManager, String retailer, SalesItemRepo salesItemRepo,  AnonymousProxy proxy,ExternalAccount accountId){
		this.url = url;
		this.minItemsSold = minItemsSold;
		this.maxItemsSold = maxItemsSold;
		this.saleDateRange = saleDateRange;
		this.itemsHeapRepo = itemsHeapRepo;
		this.requestId = requestId;
		this.urlItem = urlItem;
		this.usersSalesItemsRepo = usersSalesItemsRepo;
		this.lockManager = lockManager;
		this.retailer = retailer;
		this.salesItemRepo = salesItemRepo;
		this.proxy = proxy;
		this.accountId = accountId;
	}

	@Override
	public void run() {
		searchItems();
	}
	
	private void searchItems() {

		Document document = null;
		try {
			
			document = Jsoup.connect(url)
					.userAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.21 (KHTML, like Gecko) Chrome/19.0.1042.0 Safari/535.21\"")
					.referrer("http://www.google.com")
					.timeout(6 * 1000).get();
//			if(CrawlerUtil.isGoodPRoxy(url, proxy)) {
//				document = Jsoup.connect(url).proxy(proxy.getHost(), proxy.getPort())
//						.userAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.21 (KHTML, like Gecko) Chrome/19.0.1042.0 Safari/535.21\"")
//						.referrer("http://www.google.com")
//						.timeout(5 * 1000).get();
//			}
		} catch (IOException e) {
			logger.info("IOException parsing table: {}", e.getMessage());
		}
		
		int counter = getCountSaledTimes(document);
		if(counter > 0) {
			String saleDate = getSaleDate(document);
			if (counter >= minItemsSold && counter <= maxItemsSold) {
				logger.info("Document for Parsing Table succesful!");
				SalesItemApi item = CrawlerUtil.createItem(urlItem, accountId);
				item.setSaleDate(saleDate);
				item.setRetailer(retailer);
				item.setSearchTimesSold(counter);
				if(item.getTimesSold()==0) {
					item.setTimesSold(counter);
				}
				//this.saveActionItem(item, user, retailer);
				itemsHeapRepo.addItem(requestId, item);
			}
		} else if (CrawlerConstants.counter < 1) {
			String urlFeedBack1 = CrawlerConstants.SEARCH_URL_INPUT_PREFFIX_ITEMS + retailer
					+ CrawlerConstants.SEARCH_URL_INPUT_SUFFIX_ITEMS;
			
			String urlFeedBack2 = CrawlerConstants.SEARCH_URL_INPUT_PREFFIX_ITEMS + retailer
					+ CrawlerConstants.SEARCH_URL_INPUT_SUFFIX_ITEMS + "&page=2";
			
			searchItemsByFeedback(urlFeedBack1, urlFeedBack2);
			
		
		}
	}
	
	
	private String getSaleDate(Document document) {
		try {
			if (document.select("table td .contentValueFont").size() != 0) {
				Elements tables = document.select("table td .contentValueFont");
				Element itemPriceAsElement = null;
				String date = "";
				itemPriceAsElement = tables.get(0);
				date = tables.get(2).text();
				date = date.substring(0, 7);
				int year = Calendar.getInstance().get(Calendar.YEAR);
				date = date + String.valueOf(year);
				SimpleDateFormat formatter = new SimpleDateFormat("MMM-dd-yyyy", Locale.US);
				Date format = formatter.parse(date);
				LocalDate formatted = format.toInstant().atZone(ZoneId.systemDefault()).toLocalDate();
				return formatted.toString();
			}
			
		} catch (ParseException e) {
			logger.info("Exception in TaskItemsFilterFromTable While parsing date: {} ", e.getMessage());
		}
		return null;
	}

	private int getCountSaledTimes(Document document ) {
		int counter = 0;
		Element tableWork = document.select("table[cellpadding=5][cellspacing=0]").first();
		if (tableWork != null) {
			List<Element> rows = tableWork.select("tr");
			for (Element row : rows) {
				int currentCount = 0;
				String price = null;
				if (row.select("td[class*=contentValueFont]").first() != null) {

					if (row.select("td[class*=contentValueFont]").first().text().contains("$")) {
						price = row.select("td[class*=contentValueFont]").first().text();
					}
					if (CrawlerUtil.isNumeric(row.select("td[align=middle]").text())) {
						currentCount = Integer.parseInt(row.select("td[align=middle]").text());
					}

					Elements twoElementsPriceAndDate = row.select("td[class*=contentValueFont][align=left]");
					for (Element element : twoElementsPriceAndDate) {
						if (!element.text().contains("$")) {
							String date = element.text();
							SimpleDateFormat dateNowFormatter = new SimpleDateFormat("MMM-dd-yy", Locale.US);
							try {
								Date dateElementAsDate = dateNowFormatter.parse(date);
								Date beforeTwoWeeks = getDateBeforeWantedDays(getCurrentDate(), saleDateRange);
								if (dateElementAsDate.compareTo(beforeTwoWeeks) >= 0) {
									counter = counter + currentCount;
								}
							} catch (ParseException e) {

							}
						}
					}

				}
			}
		} else {
			logger.info("Captcha located! for proxy: Host: {} Port: {} URL: {} ", proxy.getHost(), proxy.getPort(), document.baseUri());
		}
		return counter;
	}
	
	
	private Date getCurrentDate() throws ParseException{
		DateFormat dateFormat = new SimpleDateFormat("MMM-dd-yyyy",Locale.US);
		Date date = new Date();
		String theDate = dateFormat.format(date);
		DateFormat format = new SimpleDateFormat("MMM-dd-yyyy",Locale.US);
		return format.parse(theDate);
	}
	
	private Date getDateBeforeWantedDays(Date date, int periodBackInDays) {
	    Calendar calendar = Calendar.getInstance();
	    calendar.setTime(date);
	    calendar.add(Calendar.DATE, - periodBackInDays); //2 weeks
	    return calendar.getTime();
	}
	

	private void searchItemsByFeedback(String urlRetailerFirstPage, String urlRetailerSecondPage) {

		try {
			CrawlerConstants.counter ++;
			Document document = Jsoup.connect(urlRetailerFirstPage)
					.userAgent("Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:25.0) Gecko/20100101 Firefox/25.0")
					.timeout(5 * 1000).get();
			
			Document document2 = Jsoup.connect(urlRetailerSecondPage)
					.userAgent("Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:25.0) Gecko/20100101 Firefox/25.0")
					.timeout(5 * 1000).get();

			if (document.select("div.lst-tbase").first() == null && document2.select("div.lst-tbase").first() == null) {
				Elements links1 = document.select("#viewItemId a");
				Elements links2 = document2.select("#viewItemId a");
				links1.addAll(links2);
				Map<String,Integer> selectedRepeatable =  getOnlyRepeatbleElementsFeedBackLEftForOthers(links1);
				for (Entry<String, Integer> urlItem : selectedRepeatable.entrySet()) {
					LocalDateTime localNow = LocalDateTime.now();
					String dateNow = CrawlerUtil.getDateAsString(localNow);
					SalesItemApi item = CrawlerUtil.createItem(urlItem.getKey(), accountId);
					item.setSearchTimesSold(urlItem.getValue());
					item.setSaleDate(dateNow);
					itemsHeapRepo.addItem(requestId, item);
				}
			}
		} catch (IOException e) {
			e.printStackTrace();
		} 
		
	}
	
	private Map<String,Integer> getOnlyRepeatbleElementsFeedBackLEftForOthers(Elements links) {
		Map<String,Integer> wantedUrlsFeedBack = new HashMap<>();
		List<String> convertedLinksForCheckNumbers = convertElementtoArayList(links);
		for (String el : convertedLinksForCheckNumbers) {
			int occurrences = Collections.frequency(convertedLinksForCheckNumbers, el);
			if (occurrences > CrawlerConstants.LIMIT_FOR_ADDING_ELEMENT) {
				if (!wantedUrlsFeedBack.containsKey(el)) {
					wantedUrlsFeedBack.put(el, occurrences);
				}
			}
		}
		return wantedUrlsFeedBack;

	}
	
	private List<String> convertElementtoArayList(Elements links) {
		List<String> convertedLinks = new ArrayList<String>();
		for (Element el : links) {
			String href = el.attr("href");
			convertedLinks.add(href);
		}
		return convertedLinks;
	}
	
	
	
	
	@Transactional
	private synchronized void saveActionItem(SalesItem item, User currentUser, Retailer retailer) {
		if (item != null && !item.getItemTitle().equals("")) {
			//lockManager.aquireLock(item);
			List<UsersSalesItems> uss = usersSalesItemsRepo.getUsersSalesItemsByItemUrl(item.getUrl());
			if (uss != null && uss.size() > 0) {
				if (!CrawlerUtil.isUserContainsSalesItem(uss, currentUser)) {
					SalesItem checkSalesItem = CrawlerUtil.getSalesItemfromUserSalesItems(uss, item);
					UsersSalesItems usersSalesItem = new UsersSalesItems();
					usersSalesItem.setSalesItem(checkSalesItem);
					checkSalesItem.addUserSalesItem(usersSalesItem);
					usersSalesItem.setUser(currentUser);
					saveSalesItemToDataBase(checkSalesItem);
				}
			} else {
				UsersSalesItems usersSalesItem = new UsersSalesItems();
				usersSalesItem.setSalesItem(item);
				usersSalesItem.setUser(currentUser);
				item.setRetailer(retailer);
				item.addUserSalesItem(usersSalesItem);
				saveSalesItemToDataBase(item);
			}
		}
	}
	
	private void saveSalesItemToDataBase(SalesItem salesItem)  {
		if (salesItem != null) {
			salesItemRepo.save(salesItem);
		}

	}
	
	

	
}
