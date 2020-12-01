package com.example.crawler.util;

import java.io.ByteArrayInputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpression;
import javax.xml.xpath.XPathFactory;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.w3c.dom.Document;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.example.crawler.api.RetailerApi;
import com.example.crawler.repository.RetailersHeapRepo;
import com.example.crawler.threads.TaskFilterRetailers;

public class EbayDriver {
	
	private static final Logger logger = LogManager.getLogger(EbayDriver.class);

	public final static String URL_XML_SEARCH_PREFIX = "http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME={applicationId}&GLOBAL-ID=EBAY-US&keywords=";
	public final static String URL_XML_SEARCH_SUFIX = "&outputSelector(0)=SellerInfo&outputSelector(1)=PictureURLLarge&paginationInput.entriesPerPage=25&paginationInput.pageNumber={pageNumber}&itemFilter(0).name=ListingType&itemFilter(0).value(0)=FixedPrice&itemFilter(1).name=Condition&itemFilter(1).value(0)=1000&itemFilter(1).value(1)=1500&itemFilter(1).value(2)=1750";

	public final static String URL_XML_SELLER_INFO_PREFIX = "http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SECURITY-APPNAME={applicationId}&RESPONSE-DATA-FORMAT=XML&REST-PAYLOAD&itemFilter(0).name=Seller&itemFilter(0).value(0)=";
	public final static String URL_XML_SELLER_INFO_SUFIX = "&itemFilter(0).value(1)=seller2&itemFilter(1).name=LocatedIn&itemFilter(1).value=WorldWide&paginationInput.entriesPerPage=1";

	public Map<String, Set<RetailerApi>> searchUsers(String searchString, long ratingFrom, long ratingTo,long minListings,
			long maxListings, RetailersHeapRepo retailersHeapRepo, String requestId, String accountId,String pageNumber) throws Exception {

		String address = createSearchItemsAddress(searchString, accountId,pageNumber);

		String response = URLReader.read(address);
		return parseUsers(response, ratingFrom, ratingTo, minListings, maxListings, retailersHeapRepo, requestId, accountId);
	}

	public long getUsersListings(String seller, String accountId) throws Exception {
		String address = createUserListingsCountAddress(seller, accountId);
		String response = URLReader.read(address);

		XPath xpath = XPathFactory.newInstance().newXPath();
		try (InputStream is = new ByteArrayInputStream(response.getBytes("UTF-8"));) {
			DocumentBuilderFactory domFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder builder = domFactory.newDocumentBuilder();

			Document doc = builder.parse(is);
			XPathExpression ackExpression = xpath.compile("//findItemsAdvancedResponse/ack");
			XPathExpression itemExpression = xpath.compile("//findItemsAdvancedResponse/paginationOutput/totalEntries");

			String ackToken = (String) ackExpression.evaluate(doc, XPathConstants.STRING);
			System.out.println("Get retailer listings API call: ACK from ebay API :: " +  ackToken);
			if (!ackToken.equals("Success")) {
				throw new Exception(" service returned an error");
			}

			String itemsCount = (String) itemExpression.evaluate(doc, XPathConstants.STRING);
			return Long.parseLong(itemsCount);
		}

	}

	private String createSearchItemsAddress(String searchString, String applicationId,String pageNumber) {
		// substitute token
		String token = URL_XML_SEARCH_PREFIX.replace("{applicationId}", applicationId);
		return token + searchString + URL_XML_SEARCH_SUFIX.replace("{pageNumber}", pageNumber);
	}

	private String createUserListingsCountAddress(String seller, String applicationId) {
		// substitute token
		String token = URL_XML_SELLER_INFO_PREFIX.replace("{applicationId}", applicationId);
		return token + seller + URL_XML_SELLER_INFO_SUFIX;
	}


	public Map<String, Set<RetailerApi>> parseUsers(String response, long ratingFrom, long ratingTo,long minListings, long maxListings,
			RetailersHeapRepo retailersHeapRepo, String requestId, String accountId) throws Exception {

		XPath xpath = XPathFactory.newInstance().newXPath();
		try (InputStream is = new ByteArrayInputStream(response.getBytes("UTF-8"));) {
			DocumentBuilderFactory domFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder builder = domFactory.newDocumentBuilder();

			Document doc = builder.parse(is);
			XPathExpression ackExpression = xpath.compile("//findItemsByKeywordsResponse/ack");
			XPathExpression itemExpression = xpath.compile("//findItemsByKeywordsResponse/searchResult/item");

			String ackToken = (String) ackExpression.evaluate(doc, XPathConstants.STRING);
			System.out.println("Search users by keyword API call: ACK from ebay API :: " +  ackToken);
			if (!ackToken.equals("Success")) {
				logger.error("Could not parse XML from response!");
				throw new Exception(" service returned an error");
			}

			NodeList nodes = (NodeList) itemExpression.evaluate(doc, XPathConstants.NODESET);

			ExecutorService executorUsers = Executors.newFixedThreadPool(12);
			List<Callable<Object>> tasks = new ArrayList<Callable<Object>>();

			for (int i = 0; i < nodes.getLength(); i++) {

				Node node = nodes.item(i);

				// String itemId = (String) xpath.evaluate("itemId", node,
				// XPathConstants.STRING);
				// String title = (String) xpath.evaluate("title", node, XPathConstants.STRING);
				// String itemUrl = (String) xpath.evaluate("viewItemURL", node,
				// XPathConstants.STRING);
				// String galleryUrl = (String) xpath.evaluate("galleryURL", node,
				// XPathConstants.STRING);
				//
				// String currentPrice = (String) xpath.evaluate("sellingStatus/currentPrice",
				// node, XPathConstants.STRING);
				String seller = (String) xpath.evaluate("sellerInfo/sellerUserName", node, XPathConstants.STRING);
				String feedbackScore = (String) xpath.evaluate("sellerInfo/feedbackScore", node, XPathConstants.STRING);
				String isTopRatedString = (String) xpath.evaluate("sellerInfo/topRatedSeller", node, XPathConstants.STRING);
				boolean isTopRated = Boolean.parseBoolean(isTopRatedString);
				Runnable worker = new TaskFilterRetailers(seller,minListings, maxListings, ratingFrom, ratingTo,
						Long.parseLong(feedbackScore), retailersHeapRepo, requestId, accountId, isTopRated);
				tasks.add(Executors.callable(worker));
			}

			executorUsers.invokeAll(tasks);
			executorUsers.shutdown();
			return retailersHeapRepo.getRetailers();
		}
	}
}
