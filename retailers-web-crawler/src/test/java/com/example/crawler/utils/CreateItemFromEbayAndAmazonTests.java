package com.example.crawler.utils;


import java.io.IOException;

import org.junit.Before;
import org.junit.Test;

import com.example.crawler.api.SalesItemApi;
import com.example.crawler.model.ExternalAccount;
import com.example.crawler.model.SalesItem;
import com.example.crawler.util.CrawlerUtil;


public class CreateItemFromEbayAndAmazonTests {
	
	private SalesItem saleItemCorrect;
	
	private ExternalAccount ext = new ExternalAccount();

	
	@Before
    public void setup() throws IOException {
		this.saleItemCorrect = new SalesItem();
		saleItemCorrect.setItemTitle("Foodsaver Vacuum Sealer System Fresh Food Storage Bags Kitchen Sealing Machine");
		saleItemCorrect.setPrice("US $35.79");
		saleItemCorrect.setUrl("https://www.ebay.com/itm/172754541960");
		saleItemCorrect.setUpc("048894046148");
		saleItemCorrect.setAmazonUrl("https://www.amazon.com/Manual-compact-hands-free-indicator-FSSMSL0160-000/dp/B008HMWC4A/ref=sr_1_1/139-7848754-7317631?ie=UTF8&qid=1516443152&sr=8-1&keywords=048894046148");
		saleItemCorrect.setAmazonPicture("https://images-na.ssl-images-amazon.com/images/I/31kTU+99fML._AC_US218_.jpg");
		ext.setAccountType("amazon");
		ext.setAwsSecretKey("6MPK/kfm7TzRKNZQqD+TSeikQHN6IAfaLVxxxsbT");
		ext.setAwsAccessKey("AKIAJYNJAO55XBRUWUUQ");
		ext.setAssociateTag("hotitemsfinde-20");

	}

	
//  
//    @Test
//    public void testWithCorrectUPC() throws IOException {
//    	SalesItemApi item = CrawlerUtil.createItem("https://www.ebay.com/itm/172379016613", ext);
//    	assertEquals(item.getItemTitle(), saleItemCorrect.getItemTitle());
//    	assertEquals(item.getPrice(), saleItemCorrect.getPrice());
//    	assertEquals(item.getUrl(), saleItemCorrect.getUrl());
//    	assertEquals(item.getUpc(), saleItemCorrect.getUpc());
//    	assertEquals(item.getAmazonPicture(), saleItemCorrect.getAmazonPicture());
//    	//assertEquals(item.getAmazonUrl(), saleItemCorrect.getAmazonUrl());
//    }
//	
//    
//	@Test
//	public void testEbayAccount() throws Exception {
//		String response = URLReader.read(
//				"http://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsByKeywords&SERVICE-VERSION=1.0.0&SECURITY-APPNAME=PetarPet-petarpet-PRD-ae44c9784-81060165&GLOBAL-ID=EBAY-US&keywords=bottle&outputSelector(0)=SellerInfo&outputSelector(1)=PictureURLLarge&paginationInput.entriesPerPage=25&paginationInput.pageNumber=3&itemFilter(0).name=ListingType&itemFilter(0).value(0)=FixedPrice&itemFilter(1).name=Condition&itemFilter(1).value(0)=1000&itemFilter(1).value(1)=1500&itemFilter(1).value(2)=1750");
//		EbayDriver eb = new EbayDriver();
//		eb.parseUsers(response, 100, 6000, 20, 1500, null, null, "PetarPet-petarpet-PRD-ae44c9784-81060165");
//	}
//	
//	
//	
//    @Test
//    public void testWithINCorrectUPC() throws IOException {
//    	SalesItemApi item = CrawlerUtil.createItem("https://www.ebay.com/itm/262830878363",ext);
//    	System.out.println(item);
//    }
    
//  @Test
//  public void testWithCorrectUPC() throws IOException {
//  	SalesItemApi item = CrawlerUtil.createItem("https://www.ebay.com/itm/172379016613", ext);
//  	
//  	//assertEquals(item.getAmazonUrl(), saleItemCorrect.getAmazonUrl());
//  }
	
  @Test
  public void testWithCorrectUPC() throws IOException {
  	SalesItemApi item = CrawlerUtil.createItem("https://www.ebay.com/itm/173118754117", ext);
  	
  	//assertEquals(item.getAmazonUrl(), saleItemCorrect.getAmazonUrl());
  }
    

	
//	 @Test
//   public void testWithINCorrectUPC() throws IOException {
//   	String item = "https://signin.ebay.com/ws/eBayISAPI.dll?V3Splash&caller=992&errorcode=0&ru=http%3A%2F%2Foffer.ebay.com%2Fws%2FeBayISAPI.dll%3FViewBidsLogin%26item%3D173087131964%26ViewBidsLogin%3D";
//   	String number = item.substring(item.indexOf("item%3D")+7,item.indexOf("%26ViewBidsLogin%3D"));
//   }
	

}