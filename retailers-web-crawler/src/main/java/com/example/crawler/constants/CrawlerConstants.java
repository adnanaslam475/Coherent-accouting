package com.example.crawler.constants;

public class CrawlerConstants {

	public static final String SEARCH_URL_INPUT_PREFFIX = "http://www.ebay.com/sch/i.html?_nkw=";
	public static final String SEARCH_URL_INPUT_SUFFIX = "&LH_PrefLoc=1&_ipg=200&rt=nc&LH_BIN=1";
	public static final String SEARCH_URL_INPUT_PREFFIX_ITEMS_SOLD = "http://www.ebay.com/sch/m.html?_nkw=&_armrs=1&_from=&_sop=13&_mPrRngCbx=1&_udlo=0&_udhi=10000&_clu=2&_fcid=1&_localstpos=10001&_stpos=10001&gbr=1&LH_Complete=1&LH_Sold=1&LH_ItemCondition=3&_ssn=";
		
	public static final String SEARCH_URL_INPUT_SUFFIX_ITEMS_SOLD = "&LH_PrefLoc=4&_ipg=25&_pgn={pageNumber}&rt=nc";
	public static final String HREF = "href";
	public static final String TWO_HUNDERED_PER_PAGE = "&_ipg=200";
	public static final String ONE_HUNDERED_PER_PAGE = "&_ipg=100";
	public static final String PAGINATION = "pgn=";
	public static final String SELECTOR_FOR_PAGINATION = "a.pg ";
	public static final String URL_SOLD_LISTINGS = "http://offer.ebay.com/ws/eBayISAPI.dll?ViewBidsLogin&item=";
	public static final String SELECTOR_FOR_PRODUCTS = "a.vip";
	public static final String URL_EBAY_ITEMS = "https://www.ebay.com/itm/";
	public static final String URL_EBAY_RETAAILERS = "http://www.ebay.com/usr/";
	public static final String SELECTOR_ITEMS_BY_ID = "a#vi-see-all-lnk";
	public static final String SELECTOR_SPAN_RECENT = "span.rcnt";
	public static final String SELECTOR_CAPTCHA = "bbk-anc"; 
	public static final String USER_ID = "userid="; 
	public static final String SELECTOR_CAPTCHA_HREF = "a.bbk-anc";
	public static final String SELECTOR_HREF_FEEDBACK = "a[href*=http://feedback.ebay.com]";
	public static final String SELECTOR_HREF_OFFER_DATE = "a[href*=http://offer.ebay.com/ws]";
	public static final String SELECTOR_HREF_MONTH_RATING = "a.fbsNeutralYukon";
	public static final String SELECTOR_ITEMS_BY_CLASS = "pgn=5";
	public static final String URL_EBAY = "http://www.ebay.com/";
	public static final String FIVE_PER_PAGE = "pgn=5";
	public static final String TEN_PER_PAGE = "pgn=10";
	public static final String REGEX_NUMERIC = "[-+]?\\d*\\.?\\d+";
	public static final int LIMIT_FOR_ADDING_ELEMENT = 5;
	
	public static int counter = 0;


	public static final String ONLY_SHIPPED_MESSAGE = "This does not indicate receipt by the USPS";
	public static final String PICK_UP_MESSAGE = "Shipping Partner";
	
	public static final String SEARCH_URL_INPUT_PREFFIX_ITEMS = "http://feedback.ebay.com/ws/eBayISAPI.dll?ViewFeedback2&ftab=FeedbackLeftForOthers&userid=";
	
	public static final String SEARCH_URL_INPUT_SUFFIX_ITEMS = "&iid=-1&de=off&searchInterval=30&items=200&searchInterval=30";
	
	
	public final static int MYTHREADS =  Runtime.getRuntime().availableProcessors();
}
