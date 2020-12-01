package com.example.crawler.model;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "RETAILERS")
public class Retailer implements Serializable{
	
	private static final long serialVersionUID = 5363111174307773283L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", updatable = false, nullable = false, unique = true)
	private long id;
	
	@Column(name = "retailer_username", length = 250)
	private String retailerUsername;
	
	@Column(name = "url", length = 250)
	private String url;
	
	@Column(name = "is_top_rated")
	private Boolean isTopRated; 
	
	@OneToMany(mappedBy = "retailer", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private Set<UsersRetailers> usersRetailers = new HashSet<UsersRetailers>();
	
	@OneToMany(mappedBy = "retailer", fetch = FetchType.EAGER, cascade = CascadeType.ALL)
	private Set<SalesItem> salesItems = new HashSet<SalesItem>();
	
	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
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

	public Set<UsersRetailers> getUsersRetailers() {
		return usersRetailers;
	}

	public void setUsersRetailers(Set<UsersRetailers> usersRetailers) {
		this.usersRetailers = usersRetailers;
	}

	public Set<SalesItem> getSalesItems() {
		return salesItems;
	}

	public void setSalesItems(Set<SalesItem> salesItems) {
		this.salesItems = salesItems;
	}
	
	public boolean isTopRated() {
		return isTopRated;
	}

	public void setTopRated(boolean isTopRated) {
		this.isTopRated = isTopRated;
	}

	public boolean addUserRetailer(UsersRetailers userRetailer){
		if(!this.usersRetailers.contains(userRetailer)){
			return this.usersRetailers.add(userRetailer);
		}
		return false;
	}
	
	public Set <User> getUsers(){
		Set<User> allUsers = new HashSet<User>();
		for(UsersRetailers ur : this.usersRetailers){
			allUsers.add(ur.getUser());
		}
		return allUsers;
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
		Retailer other = (Retailer) obj;
		if (retailerUsername == null) {
			if (other.retailerUsername != null)
				return false;
		} else if (!retailerUsername.equals(other.retailerUsername))
			return false;
		return true;
	}

	
	
	
	
	
	
	
	

}
