package com.example.display.api;


public class SearchItemsParametersApi {
	

	private long minItemsSold;
	
	private long maxItemsSold;
	
	private String retailerUserName;
	
	private int saleDateRange;
	
	private long pageNumber;

	public long getMinItemsSold() {
		return minItemsSold;
	}

	public void setMinItemsSold(long minItemsSold) {
		this.minItemsSold = minItemsSold;
	}

	public long getMaxItemsSold() {
		return maxItemsSold;
	}

	public void setMaxItemsSold(long maxItemsSold) {
		this.maxItemsSold = maxItemsSold;
	}

	public String getRetailerUserName() {
		return retailerUserName;
	}

	public void setRetailerUserName(String retailerUserName) {
		this.retailerUserName = retailerUserName;
	}

	public int getSaleDateRange() {
		return saleDateRange;
	}

	public void setSaleDateRange(int saleDateRange) {
		this.saleDateRange = saleDateRange;
	}

	public long getPageNumber() {
		return pageNumber;
	}

	public void setPageNumber(long pageNumber) {
		this.pageNumber = pageNumber;
	}
	
	
}

