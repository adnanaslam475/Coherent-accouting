package com.example.display.api;

public class RetailerApi {

	private String retailerUsername;

	private String url;

	private int feedbackScore;

	private int sellerListings;
	
	private boolean isTopRated;

	public String getRetailerUsername() {
		return retailerUsername;
	}

	public void setRetailerUsername(String retailerUsername) {
		this.retailerUsername = retailerUsername;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public int getFeedbackScore() {
		return feedbackScore;
	}

	public void setFeedbackScore(int feedbackScore) {
		this.feedbackScore = feedbackScore;
	}

	public int getSellerListings() {
		return sellerListings;
	}

	public void setSellerListings(int sellerListings) {
		this.sellerListings = sellerListings;
	}

	public boolean isTopRated() {
		return isTopRated;
	}

	public void setTopRated(boolean isTopRated) {
		this.isTopRated = isTopRated;
	}
	
	

	
	

}
