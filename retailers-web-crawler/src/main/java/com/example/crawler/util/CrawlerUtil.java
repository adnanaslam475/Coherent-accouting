package com.example.crawler.util;

import java.io.BufferedWriter;
import java.io.ByteArrayInputStream;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Set;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpression;
import javax.xml.xpath.XPathExpressionException;
import javax.xml.xpath.XPathFactory;

import org.apache.commons.lang3.StringUtils;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.helper.StringUtil;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.example.crawler.api.SalesItemApi;
import com.example.crawler.aws.AmazonProductAdvertisingApiRequestBuilder;
import com.example.crawler.aws.AmazonWebServiceAuthentication;
import com.example.crawler.aws.AmazonWebServiceLocation;
import com.example.crawler.aws.ItemId;
import com.example.crawler.aws.ItemInformation;
import com.example.crawler.constants.CrawlerConstants;
import com.example.crawler.model.AnonymousProxy;
import com.example.crawler.model.ExternalAccount;
import com.example.crawler.model.Retailer;
import com.example.crawler.model.SalesItem;
import com.example.crawler.model.User;
import com.example.crawler.model.UsersRetailers;
import com.example.crawler.model.UsersSalesItems;

public class CrawlerUtil {

	
	private static final Logger logger = LogManager.getLogger(CrawlerUtil.class);
//	private static final String ASSOCIATE_TAG = "hotitemsfinde-20";
//    private static final String AWS_ACCESS_KEY = "AKIAJYNJAO55XBRUWUUQ";
//    private static final String AWS_SECRET_KEY = "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";

    
    //private static AmazonWebServiceAuthentication authentication = AmazonWebServiceAuthentication.create(ASSOCIATE_TAG, AWS_ACCESS_KEY, AWS_SECRET_KEY);;
	
	public static boolean isNumeric(String s) {
		return s.matches(CrawlerConstants.REGEX_NUMERIC);
	}

	public static int getNumbersForSale(Document document, AnonymousProxy proxy) throws IOException {
		Element linkWithSellingItems = null;
		if (document.select(CrawlerConstants.SELECTOR_ITEMS_BY_ID).first() != null) {
			linkWithSellingItems = document.select(CrawlerConstants.SELECTOR_ITEMS_BY_ID).first();
			System.out.println(linkWithSellingItems + "links with selling items");
		}
		String urlSellItems = linkWithSellingItems.absUrl(CrawlerConstants.HREF);
		Document documentSellItems = Jsoup.connect(urlSellItems).proxy(proxy.getHost(), proxy.getPort()).timeout(10 * 1000).get();
		Element elementNumbersForSale = null;
		if (documentSellItems.select(CrawlerConstants.SELECTOR_SPAN_RECENT).first() != null) {
			elementNumbersForSale = documentSellItems.select(CrawlerConstants.SELECTOR_SPAN_RECENT).first();
		}
		int numbersForSale = Integer.parseInt(elementNumbersForSale.text().replace(",", ""));
		return numbersForSale;
	}
	
	public static boolean isGoodPRoxy (String baseUrl, AnonymousProxy proxy) throws IOException{
    	Connection con = Jsoup.connect(baseUrl).userAgent("Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.21 (KHTML, like Gecko) Chrome/19.0.1042.0 Safari/535.21").proxy(proxy.getHost(), proxy.getPort()).timeout(10000);
        Connection.Response resp = con.execute();
         if (resp.statusCode() == 200) {
        	 System.out.println("OKKKK " + proxy.getHost() + " port:" + proxy.getPort());
            return true;
         }
         return false;
    }

	public static int getMonthRating(Document urlRating) throws IOException {
		int monthRating = 1;
		if (!(urlRating.select(CrawlerConstants.SELECTOR_CAPTCHA_HREF) != null && urlRating
				.select(CrawlerConstants.SELECTOR_CAPTCHA).text().equals("Change the image"))) {
			if (urlRating.select(CrawlerConstants.SELECTOR_HREF_MONTH_RATING) != null) {
				Elements str = urlRating.select(CrawlerConstants.SELECTOR_HREF_MONTH_RATING);
				if (str.first() != null) {
					Element el = str.first();
					if (el.text() != null) {
						monthRating = Integer.parseInt(el.text());
					}
				}

			}
		}
		return monthRating;
	}

	public static int countOccurrences(String main, String sub) {
		return (main.length() - main.replace(sub, "").length()) / sub.length();
	}
	
	public static List<String> convertElementtoArayList(Elements links) {
		List<String> convertedLinks = new ArrayList<String>();
		for (Element el : links) {
			String href = el.attr("href");
			convertedLinks.add(href);
		}
		return convertedLinks;
	}

	public static Set<String> convertElementtoArayList(List<Element> links) {
		Set<String> convertedLinks = new HashSet<String>();
		for (Element el : links) {
			String href = el.attr("href");
			convertedLinks.add(href);
		}
		return convertedLinks;
	}
	
	public static String getDateAsString(LocalDateTime deliveryDate) {
		if(deliveryDate != null) {
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
			return deliveryDate.format(formatter);
		}
		return null;
	}

	public static SalesItemApi createItem(String itemUrl, ExternalAccount accountId) {
		SalesItemApi saleItem = new SalesItemApi();
		AmazonWebServiceAuthentication authentication = AmazonWebServiceAuthentication.create(accountId.getAssociateTag(), accountId.getAwsAccessKey(), accountId.getAwsSecretKey());;
		try {
			Document document = Jsoup.connect(itemUrl).timeout(4 * 1000).get();
			saleItem.setUrl(itemUrl);
			Element itemTitleAsElement = document.select("h1#itemTitle").first();
			String itemTitle = itemTitleAsElement.text();
			itemTitle = itemTitle.substring(15, itemTitle.length());
			saleItem.setItemTitle(itemTitle);
			Element itemPriceAsElement = null;
			if (document.select("span#prcIsum").size() != 0) {
				itemPriceAsElement = document.select("span#prcIsum").first();
			} else if (document.select("div#prcIsum").size() != 0) {
				itemPriceAsElement = document.select("div#prcIsum").first();
			} else if (document.select("div#bb_bdp").size() != 0){
				itemPriceAsElement = document.select("span#mm-saleDscPrc").first();
			}

			String itemPrice = "US $0.00";
			if (itemPriceAsElement != null) {
				itemPrice = itemPriceAsElement.text();
			}
			saleItem.setPrice(itemPrice);
			if (document.select("img[id=icImg]").first() != null) {
				Element img = document.select("img[id=icImg]").first();
				String imgSrc = img.attr("src");
				saleItem.setPicture(imgSrc);
			}
			if(document.select("span.vi-qty-pur-lnk")!=null){
				String occurrencesString = document.select("span.vi-qty-pur-lnk").text();
				if(!occurrencesString.equals("")){
					int timesSold = Integer.parseInt(occurrencesString.substring(0, occurrencesString.indexOf(" sold")).replace(",", ""));
					saleItem.setTimesSold(timesSold);
					
				} 

			}

			String upc = "";
			
			//CrawlerUtil.saveUrlToFile(document.toString(), "C:\\Users\\user\\Desktop\\doc.txt");
			if(document.select("h2[itemprop=gtin13]")!=null) {
				upc = document.select("h2[itemprop=gtin13]").text().split(" ")[0];
			}
			String searchAmazonTitle = getTitleSubstring(itemTitle);
			if(!StringUtil.isBlank(upc)) {
				saleItem.setUpc(upc);
				final ItemId ITEM_ID = ItemId.createUpc(upc);
				final String requestUrl = AmazonProductAdvertisingApiRequestBuilder.forItemLookup(ITEM_ID)
		        		.includeInformationAbout(ItemInformation.IMAGES)
		        		.includeInformationAbout(ItemInformation.ATTRIBUTES)
		        		.includeInformationAbout(ItemInformation.OFFERS)
		                .createRequestUrlFor(AmazonWebServiceLocation.USA, authentication);
				String response = URLReader.read(requestUrl);
				logger.info("Amazon request to Amazon URL: {} ", requestUrl);
				if(isValidUPC(response)) {
					getPropertiesFromAmazonUPC(response, saleItem);
				} else {
					searchBySearchWordInAmazon(searchAmazonTitle,saleItem, authentication);
				}
			} else {
				searchBySearchWordInAmazon(searchAmazonTitle,saleItem, authentication);
			}
			
		} catch (Exception e) {
			logger.error("Document from JSOAP could not be parsed parsed");
			logger.error("Exception in CrawlerUtil: {} ", e.getMessage());
		}

		return saleItem;
	}
	
	private static void searchBySearchWordInAmazon(String searchAmazonTitle , SalesItemApi saleItem,AmazonWebServiceAuthentication authentication) throws Exception {
		final String requestUrlSearchWord = AmazonProductAdvertisingApiRequestBuilder.forItemSearch(searchAmazonTitle)
				 .includeInformationAbout(ItemInformation.IMAGES)
				 .includeInformationAbout(ItemInformation.ATTRIBUTES)
				 .includeInformationAbout(ItemInformation.OFFERS)
	                .createRequestUrlFor(AmazonWebServiceLocation.USA, authentication);
		 String responseSearchWord = URLReader.read(requestUrlSearchWord);
		 getPropertiesFromAmazonByWord(responseSearchWord,saleItem);
	}

	
	
	
	
	private static boolean isValidUPC(String response) throws Exception {
		XPath xpath = XPathFactory.newInstance().newXPath();
		try (InputStream is = new ByteArrayInputStream(response.getBytes("UTF-8"));) {
			DocumentBuilderFactory domFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder builder = domFactory.newDocumentBuilder();
			org.w3c.dom.Document doc = builder.parse(is);
			XPathExpression validExpression = xpath.compile("/ItemLookupResponse/Items/Request/Errors/Error/Code");
			String message = (String) validExpression.evaluate(doc, XPathConstants.STRING);
			if(message.equals("AWS.InvalidParameterValue")) {
				logger.info("Amazon AWS.InvalidParameterValue! Will check with search word");
				return false;
			}
		}
		return true;
	}
	
	private static SalesItemApi getPropertiesFromAmazonUPC(String response, SalesItemApi item) throws Exception {
		XPath xpath = XPathFactory.newInstance().newXPath();
		try (InputStream is = new ByteArrayInputStream(response.getBytes("UTF-8"));) {
			logger.info("parsing Amazon response!");
			DocumentBuilderFactory domFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder builder = domFactory.newDocumentBuilder();
			org.w3c.dom.Document doc = builder.parse(is);
			XPathExpression detailPageUrl = xpath.compile("/ItemLookupResponse/Items/Item/DetailPageURL");
			XPathExpression itemExpression = xpath.compile("/ItemLookupResponse/Items/Item/LargeImage/URL");
			XPathExpression priceExpression = null;
			XPathExpression primePrice = null;
			String amzPrice = null;
			
			logger.info("typeResponse: ItemLookupResponse ");
			primePrice = xpath.compile("/ItemLookupResponse/Items/Item/OfferSummary/LowestNewPrice/FormattedPrice");
			if(primePrice != null) {
				amzPrice = (String) primePrice.evaluate(doc, XPathConstants.STRING);
			}
			priceExpression = xpath.compile("/ItemLookupResponse/Items/Item/ItemAttributes/ListPrice/FormattedPrice");
			
			String image = (String) itemExpression.evaluate(doc, XPathConstants.STRING);
			String url = (String) detailPageUrl.evaluate(doc, XPathConstants.STRING);
			if(StringUtils.isNotBlank(amzPrice)) {
				item.setAmazonPrice(amzPrice);
			} else {
				String price = (String) priceExpression.evaluate(doc, XPathConstants.STRING);
				item.setAmazonPrice(price);
			}
			item.setAmazonPicture(image);
			item.setAmazonUrl(url);
		}
		return item;
	}
	
	private static SalesItemApi getPropertiesFromAmazonByWord(String response, SalesItemApi item) throws Exception {
		XPath xpath = XPathFactory.newInstance().newXPath();
		try (InputStream is = new ByteArrayInputStream(response.getBytes("UTF-8"));) {
			logger.info("parsing Amazon response!");
			DocumentBuilderFactory domFactory = DocumentBuilderFactory.newInstance();
			DocumentBuilder builder = domFactory.newDocumentBuilder();
			org.w3c.dom.Document doc = builder.parse(is);
			
			XPathExpression itemsList = xpath.compile("/ItemSearchResponse/Items/Item");
			NodeList nodes = (NodeList) itemsList.evaluate(doc, XPathConstants.NODESET);
			Node minPriceNode = getItemWithMinPrice(xpath, nodes);
			
			logger.info("typeResponse: ItemSearchResponse ");
			
			String url = (String) xpath.evaluate("DetailPageURL", minPriceNode, XPathConstants.STRING);
			String image = (String) xpath.evaluate("LargeImage/URL", minPriceNode, XPathConstants.STRING);
			
			String nodePrimePrice = (String) xpath.evaluate("OfferSummary/LowestNewPrice/FormattedPrice", minPriceNode, XPathConstants.STRING);
			
			if(StringUtils.isNotBlank(nodePrimePrice)) {
				item.setAmazonPrice(nodePrimePrice);
			} else {
				String regularPrice = (String) xpath.evaluate("Offers/Offer/OfferListing/Price/FormattedPrice", minPriceNode, XPathConstants.STRING);
				item.setAmazonPrice(regularPrice);
			}
			item.setAmazonPicture(image);
			item.setAmazonUrl(url);
		}
		return item;
	}
	
	private static Node getItemWithMinPrice(XPath xpath, NodeList nodes) throws XPathExpressionException {
		Double minPrice = Double.MAX_VALUE;
		int minNodeIndex = 0;
		for (int i = 0; i < nodes.getLength(); i++) {
			Node node = nodes.item(i);
			String currentPrice = null;
			String nodePrimePrice = (String) xpath.evaluate("OfferSummary/LowestNewPrice/FormattedPrice", node, XPathConstants.STRING);
			if(StringUtils.isNotBlank(nodePrimePrice)) {
				currentPrice = nodePrimePrice.replace("$", "");
			} else {
				String regularPrice = (String) xpath.evaluate("Offers/Offer/OfferListing/Price/FormattedPrice", node, XPathConstants.STRING);
				currentPrice = regularPrice.replaceAll("$", "");
			}
			Double curPrice = Double.parseDouble(currentPrice);
			if (curPrice < minPrice) {
				minPrice = curPrice;
				minNodeIndex = i;
			}
			
		}
		return nodes.item(minNodeIndex);
	}
	
	
	
	private static String getTitleSubstring(String title) {
		String[] arr = title.split("\\s+");
		StringBuffer sb = new StringBuffer();
		if (arr.length < 6) {
			for (String str : arr) {
				sb.append(str).append(" ");
			}
		} else if (arr.length >= 6 ) {
			for (int i = 0; i < 4 ; i++) {
				String str = arr[i];
				sb.append(str).append(" ");
			}
		}
		return sb.toString().trim();
	}
	
	
	private static void getAmazonItemProperties(Document documentAmazon, SalesItem salesItem) throws IOException {
		String amazonItemUrl = documentAmazon.select("a.a-link-normal").first().attr("href");
		
		amazonItemUrl = amazonItemUrl.substring(amazonItemUrl.indexOf("/dp/"));
		salesItem.setAmazonUrl(amazonItemUrl);
		String amazonImage = documentAmazon.select("img[class*=s-access-image cfMarker]").first().attr("src");
		salesItem.setAmazonPicture(amazonImage);

	}
	
	public static Date getItemDate(String url) throws IOException {
		Document documentDate = Jsoup.connect(url).timeout(4 * 1000).get();
		Elements tables = documentDate.select("table td .contentValueFont");
		Element tableElThree = tables.get(2);
		String date = tableElThree.text();
		date = date.substring(0, 9);
		DateFormat formatter = new SimpleDateFormat("MMM-dd-YY", Locale.ENGLISH);
		Date dateFormatted = new Date();
		try {
			dateFormatted = formatter.parse(date);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return dateFormatted;
	}

	
	public static SalesItemApi getItemPropertiesCaptcha(Document document) throws IOException {
		SalesItemApi saleItem = new SalesItemApi();
		String date = "";
		try {
			Element itemTitleAsElement = null;
			if (document.select("div.itemTitle").first() != null) {
				itemTitleAsElement = document.select("div.itemTitle").first();
			} else if (document.select("a.BHitemDesc").first() != null) {
				itemTitleAsElement = document.select("a.BHitemDesc").first();
			} else if (document.select("div#bb_bdp").size() != 0){
				//TODO fix this selector
				itemTitleAsElement = document.select("span#mm-saleDscPrc").first();
			}

			String itemTitle = itemTitleAsElement.text();
			System.out.println(itemTitle + " title");
			itemTitle = itemTitle.substring(11, itemTitle.length());
			System.out.println(itemTitle + "itemtitle");
			Element itemPriceAsElement = null;
			if (document.select("table td .contentValueFont").size() != 0) {
				Elements tables = document.select("table td .contentValueFont");
				Elements tablesElementSold = document.select("table td .onheadNav");
				int timesSold = tablesElementSold.size();
				saleItem.setTimesSold(timesSold);
				itemPriceAsElement = tables.get(0);
				date = tables.get(2).text();
				date = date.substring(0, 7);
				int year = Calendar.getInstance().get(Calendar.YEAR);
				date = date + String.valueOf(year);
				SimpleDateFormat formatter = new SimpleDateFormat("MMM-dd-yyyy", Locale.US);
//				try {
//					saleItem.setSaleDate(formatter.parse(date));
//				} catch (ParseException e) {
//
//					e.printStackTrace();
//				}
			}
			String itemPrice = "US $0.00";
			if (itemPriceAsElement != null) {
				itemPrice = itemPriceAsElement.text();
			}
			Element img = null;
			String imgSrc = "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/EBay_logo.svg/1000px-EBay_logo.svg.png";
			if (document.select("img[src*=https://i.ebayimg.com/]") != null && document.select("img[src*=https://i.ebayimg.com/]").size()!=0) {
				img = document.select("img[src*=https://i.ebayimg.com/]").first();
				imgSrc = img.attr("src");
			}
			saleItem.setPicture(imgSrc);
			
			saleItem.setItemTitle(itemTitle);
			saleItem.setPrice(itemPrice);

			if (document.select("a[href*=http://www.ebay.com/itm/]") != null) {
				Element itemElement = document.select("a[href*=http://www.ebay.com/itm/]").first();
				String itemUrl = itemElement.attr("href");
				saleItem.setUrl(itemUrl);
			}
		} catch (Exception e) {
			saleItem.setItemTitle("");
			saleItem.setPrice("");
			saleItem.setUrl("");
			saleItem.setSaleDate(null);
			System.out.println("captcha located Captcha");
		}
		
		return saleItem;
	}
	
	
	public static SalesItem getSalesItemfromUserSalesItems(List<UsersSalesItems> uss, SalesItem item){
		for(UsersSalesItems items : uss){
			if(items.getSalesItem().getUrl().equals(item.getUrl())){
				return items.getSalesItem();
			}
		}
		return null;
	}
	
	public static boolean isUserContainsSalesItem(List<UsersSalesItems> uss, User currentUser){
		for(UsersSalesItems items : uss){
			if(items.getUser().getUsername().equals(currentUser.getUsername())){
				return true;
			}
		}
		
		return false;
	}
	
	
	public static boolean isUserContainsRetailers(List<UsersRetailers> uss, User currentUser){
		for(UsersRetailers retailer : uss){
			if(retailer.getUser().getUsername().equals(currentUser.getUsername())){
				return true;
			}
		}
		return false;
	}
	
	
	public static Retailer getRetailerfromUsersRetailers(List<UsersRetailers> uss, Retailer retailer){
		for(UsersRetailers ret : uss){
			if(ret.getRetailer().getRetailerUsername().equals(retailer.getRetailerUsername())){
				return ret.getRetailer();
			}
		}
		return null;
	}
	
	public static String getretailerURLforSoldItems(String retailer,String pageNumber){
		String url = CrawlerConstants.SEARCH_URL_INPUT_PREFFIX_ITEMS_SOLD + retailer
				+ CrawlerConstants.SEARCH_URL_INPUT_SUFFIX_ITEMS_SOLD;
		url = url.replace("{pageNumber}", pageNumber);
		return url;
	}
	
	public static Retailer getRetailerProps(Document document, String retailerUrl) throws IOException {
		Retailer retailer = new Retailer();
		
		if (document.select(CrawlerConstants.SELECTOR_CAPTCHA) != null) {
			try {
				Element retailerNameAsElement = document.select("span.mbg-nw").first();
				String retailerName = retailerNameAsElement.text();
				String rating = document.select("span.mbg-l").first().text();//( 329)
				retailer.setUrl(retailerUrl);
				retailer.setRetailerUsername(retailerName);
			} catch (Exception e) {

			}

		}
		return retailer;
	}



	public static void saveUrlToFile(String stringToWrite, String fileName) throws IOException {

		try {
			File file = new File(fileName);
			// if file doesnt exists, then create it
			if (!file.exists()) {
				file.createNewFile();
			}
			FileWriter fw = new FileWriter(file.getAbsoluteFile(), true);
			BufferedWriter bw = new BufferedWriter(fw);
			bw.write(stringToWrite);
			bw.write("\n");
			bw.close();

		} catch (IOException e) {
			e.printStackTrace();
		}

	}

	public static String fixSearchWordForUsers (String inputWord){
		String allWords [] = inputWord.split(" ");
		StringBuilder sb = new StringBuilder();
		for (String string : allWords) {
			sb.append(string);
			sb.append("+");
		}
		String searchWordInput = sb.toString();
		searchWordInput = searchWordInput.substring(0, searchWordInput.lastIndexOf("+"));
		return searchWordInput;
	}
	
	
	public static boolean testConnection(String site) {
		Socket sock = new Socket();
		InetSocketAddress addr = new InetSocketAddress(site, 80);
		try {
			sock.connect(addr, 3000);
			return true;
		} catch (IOException e) {
			return false;
		} finally {
			try {
				sock.close();
			} catch (IOException e) {
			}
		}
	}
	
	
//	public static Map<String,String> convertElementtoArayListIdAndTitle(Elements links) {
//		Map<String,String> convertedLinks = new HashMap<>();
//		for (Element el : links) {
//			String image = el.getElementsByClass("img").get(2).attr("src");
//			String title = el.getElementsByClass("vip").text();
//			
//			String href = el.attr("href");
//			String id = href.substring(href.lastIndexOf("/") + 1, href.indexOf("?"));
//			String title = el.text();
//			convertedLinks.put(id,title);
//		}
//		return convertedLinks;
//	}
}
