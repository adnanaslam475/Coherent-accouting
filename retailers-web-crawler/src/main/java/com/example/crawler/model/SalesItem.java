package com.example.crawler.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "SALES_ITEMS")
public class SalesItem implements Serializable{
	
	private static final long serialVersionUID = 7737393316016043387L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", updatable = false, nullable = false, unique = true)
	private long id;
	
	@Column(name = "price", length = 250)
	private String price;
	
	@Column(name = "item_title", length = 250)
	private String itemTitle;
	
	@Column(name = "sale_date")
	private Date saleDate;
	
	@Column(name = "times_sold")
	private long timesSold;
	
	@Column(name = "url", length = 250)
	private String url;
	
	@Column(name = "picture", length = 250)
	private String picture;
	
	@ManyToOne
	@JoinColumn(name = "retailer_id")
	private Retailer retailer;
	
	@OneToMany(mappedBy = "salesItem", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<UsersSalesItems> usersSalesItems = new ArrayList<UsersSalesItems>();
	
	@Column(name = "upc", length = 250)
	private String upc;
	
	@Column(name = "amazon_url", length = 250)
	private String amazonUrl;
	
	@Column(name = "amazon_picture", length = 250)
	private String amazonPicture;
	
	@Column(name = "amazon_price", length = 250)
	private String amazonPrice;
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
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
	
	public Date getSaleDate(){
		return saleDate;
	}
	
	public void setSaleDate(Date saleDate){
		this.saleDate = saleDate;
	}
	
	public String getSaleDateAsString(){
		String dateString = saleDate.toString();
		return dateString.substring(0, 10);
	}

	public String getPicture() {
		return picture;
	}

	public void setPicture(String picture) {
		this.picture = picture;
	}
	
	public long getTimesSold(){
		return timesSold;
	}

	public void setTimesSold(long timesSold){
		this.timesSold = timesSold;
	}
	
	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public Retailer getRetailer() {
		return retailer;
	}

	public void setRetailer(Retailer retailer) {
		this.retailer = retailer;
	}

	public List<UsersSalesItems> getUsersSalesItems() {
		return usersSalesItems;
	}

	public void setUsersSalesItems(List<UsersSalesItems> usersSalesItems) {
		this.usersSalesItems = usersSalesItems;
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

	public String getAmazonPrice() {
		return amazonPrice;
	}

	public void setAmazonPrice(String amazonPrice) {
		this.amazonPrice = amazonPrice;
	}

	public boolean addUserSalesItem(UsersSalesItems userSalesItem){
		if(!this.usersSalesItems.contains(userSalesItem)){
			return this.usersSalesItems.add(userSalesItem);
		}
		return false;
	}
	
	public Set <User> getUsers(){
		Set<User> allUsers = new HashSet<User>();
		for(UsersSalesItems ur : this.usersSalesItems){
			allUsers.add(ur.getUser());
		}
		return allUsers;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((retailer == null) ? 0 : retailer.hashCode());
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
		SalesItem other = (SalesItem) obj;
		if (retailer == null) {
			if (other.retailer != null)
				return false;
		} else if (!retailer.equals(other.retailer))
			return false;
		if (url == null) {
			if (other.url != null)
				return false;
		} else if (!url.equals(other.url))
			return false;
		return true;
	}
	
	




	
	
	
	
	
}
