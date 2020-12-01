package com.example.crawler.api;

public class RetailerApi {

	private String retailerUsername;

	private String url;

	private Long feedbackScore;

	private Long sellerListings;
	
	private boolean isTopRated;
	
	public RetailerApi(String retailerUsername, String url, Long feedbackScore, Long sellerListings, boolean isTopRated) {
		this.retailerUsername = retailerUsername;
		this.url = url;
		this.feedbackScore = feedbackScore;
		this.sellerListings = sellerListings;
		this.isTopRated = isTopRated;
	}
	
	public RetailerApi() {
		
	}

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

	public Long getFeedbackScore() {
		return feedbackScore;
	}

	public void setFeedbackScore(Long feedbackScore) {
		this.feedbackScore = feedbackScore;
	}

	public Long getSellerListings() {
		return sellerListings;
	}

	public void setSellerListings(Long sellerListings) {
		this.sellerListings = sellerListings;
	}

	public boolean isTopRated() {
		return isTopRated;
	}

	public void setTopRated(boolean isTopRated) {
		this.isTopRated = isTopRated;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((retailerUsername == null) ? 0 : retailerUsername.hashCode());
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
		RetailerApi other = (RetailerApi) obj;
		if (retailerUsername == null) {
			if (other.retailerUsername != null)
				return false;
		} else if (!retailerUsername.equals(other.retailerUsername))
			return false;
		return true;
	}


}
