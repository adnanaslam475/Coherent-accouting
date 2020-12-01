package com.example.crawler.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "USERS_SALESITEMS")
public class UsersSalesItems implements Serializable {
	
	private static final long serialVersionUID = -8852451229893319026L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", updatable = false, nullable = false, unique = true)
	private long id;
	
	@ManyToOne//(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")  
	private User user;
	
	@ManyToOne//(cascade = CascadeType.ALL)
    @JoinColumn(name = "salesitem_id")  
	private SalesItem salesItem;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public SalesItem getSalesItem() {
		return salesItem;
	}

	public void setSalesItem(SalesItem salesItem) {
		this.salesItem = salesItem;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((salesItem == null) ? 0 : salesItem.hashCode());
		result = prime * result + ((user == null) ? 0 : user.hashCode());
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
		UsersSalesItems other = (UsersSalesItems) obj;
		if (salesItem == null) {
			if (other.salesItem != null)
				return false;
		} else if (!salesItem.equals(other.salesItem))
			return false;
		if (user == null) {
			if (other.user != null)
				return false;
		} else if (!user.equals(other.user))
			return false;
		return true;
	}

	
}
