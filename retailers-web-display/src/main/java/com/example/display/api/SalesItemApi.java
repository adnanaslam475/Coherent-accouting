package com.example.display.api;

public class SalesItemApi {
	
	private Long id;

	private String itemTitle;

	private String price; 
	
	private String saleDate;
	
	private long timesSold; 

	private String url; 
	
	private String picture;

	private String upc;
	
	private String amazonUrl;

	private String amazonPicture;
	
	private String amazonPrice;
	
	private String retailer;
	
	private long searchTimesSold; 
	
	public SalesItemApi(String itemTitle,String price, String saleDate,long timesSold,String url,String picture,String upc,String amazonUrl,  String amazonPicture) {
		this.itemTitle = itemTitle;
		this.price = price;
		this.saleDate = saleDate;
		this.timesSold = timesSold;
		this.url = url;
		this.picture = picture;
		this.upc = itemTitle;
		this.amazonUrl = amazonUrl;
		this.amazonPicture = amazonPicture;
	}
	
	public SalesItemApi() {
		
	}
	
	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getItemTitle() {
		return itemTitle;
	}

	public void setItemTitle(String itemTitle) {
		this.itemTitle = itemTitle;
	}

	public String getSaleDate() {
		return saleDate;
	}

	public void setSaleDate(String saleDate) {
		this.saleDate = saleDate;
	}

	public long getTimesSold() {
		return timesSold;
	}

	public void setTimesSold(long timesSold) {
		this.timesSold = timesSold;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}

	public String getUpc() {
		return upc;
	}

	public void setUpc(String upc) {
		this.upc = upc;
	}

	public String getAmazonUrl() {
		return amazonUrl;
	}

	public void setAmazonUrl(String amazonUrl) {
		this.amazonUrl = amazonUrl;
	}

	public String getAmazonPicture() {
		return amazonPicture;
	}

	public void setAmazonPicture(String amazonPicture) {
		this.amazonPicture = amazonPicture;
	}
	
	public String getRetailer() {
		return retailer;
	}

	public void setRetailer(String retailer) {
		this.retailer = retailer;
	}

	public String getAmazonPrice() {
		return amazonPrice;
	}

	public void setAmazonPrice(String amazonPrice) {
		this.amazonPrice = amazonPrice;
	}

	public long getSearchTimesSold() {
		return searchTimesSold;
	}

	public void setSearchTimesSold(long searchTimesSold) {
		this.searchTimesSold = searchTimesSold;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((amazonPicture == null) ? 0 : amazonPicture.hashCode());
		result = prime * result + ((amazonUrl == null) ? 0 : amazonUrl.hashCode());
		result = prime * result + ((itemTitle == null) ? 0 : itemTitle.hashCode());
		result = prime * result + ((picture == null) ? 0 : picture.hashCode());
		result = prime * result + ((price == null) ? 0 : price.hashCode());
		result = prime * result + ((saleDate == null) ? 0 : saleDate.hashCode());
		result = prime * result + (int) (timesSold ^ (timesSold >>> 32));
		result = prime * result + ((upc == null) ? 0 : upc.hashCode());
		result = prime * result + ((url == null) ? 0 : url.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		SalesItemApi other = (SalesItemApi) obj;
		if (amazonPicture == null) {
			if (other.amazonPicture != null)
				return false;
		} else if (!amazonPicture.equals(other.amazonPicture))
			return false;
		if (amazonUrl == null) {
			if (other.amazonUrl != null)
				return false;
		} else if (!amazonUrl.equals(other.amazonUrl))
			return false;
		if (itemTitle == null) {
			if (other.itemTitle != null)
				return false;
		} else if (!itemTitle.equals(other.itemTitle))
			return false;
		if (picture == null) {
			if (other.picture != null)
				return false;
		} else if (!picture.equals(other.picture))
			return false;
		if (price == null) {
			if (other.price != null)
				return false;
		} else if (!price.equals(other.price))
			return false;
		if (saleDate == null) {
			if (other.saleDate != null)
				return false;
		} else if (!saleDate.equals(other.saleDate))
			return false;
		if (timesSold != other.timesSold)
			return false;
		if (upc == null) {
			if (other.upc != null)
				return false;
		} else if (!upc.equals(other.upc))
			return false;
		if (url == null) {
			if (other.url != null)
				return false;
		} else if (!url.equals(other.url))
			return false;
		return true;
	}

 }
