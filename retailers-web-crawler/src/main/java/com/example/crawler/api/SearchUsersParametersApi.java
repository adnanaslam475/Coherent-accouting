package com.example.crawler.api;


public class SearchUsersParametersApi {
	
	private long minFeedback;
	private long maxFeedback;
	private String searchWord;
	private long maxActiveListings;
	private long minActiveListings;
	private long pageNumber;
	public long getMinFeedback() {
		return minFeedback;
	}
	public void setMinFeedback(long minFeedback) {
		this.minFeedback = minFeedback;
	}
	public long getMaxFeedback() {
		return maxFeedback;
	}
	public void setMaxFeedback(long maxFeedback) {
		this.maxFeedback = maxFeedback;
	}
	public String getSearchWord() {
		return searchWord;
	}
	public void setSearchWord(String searchWord) {
		this.searchWord = searchWord;
	}
	public long getMaxActiveListings() {
		return maxActiveListings;
	}
	public void setMaxActiveListings(long maxActiveListings) {
		this.maxActiveListings = maxActiveListings;
	}
	public long getMinActiveListings() {
		return minActiveListings;
	}
	public void setMinActiveListings(long minActiveListings) {
		this.minActiveListings = minActiveListings;
	}
	public long getPageNumber() {
		return pageNumber;
	}
	public void setPageNumber(long pageNumber) {
		this.pageNumber = pageNumber;
	}
	@Override
	public String toString() {
		return "SearchUsersParametersApi [minFeedback=" + minFeedback + ", maxFeedback=" + maxFeedback + ", searchWord="
				+ searchWord + ", maxActiveListings=" + maxActiveListings + ", minActiveListings=" + minActiveListings
				+ ", pageNumber=" + pageNumber + "]";
	}

	
	
	
}

