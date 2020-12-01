package com.example.crawler.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * Created by fan.jin on 2016-10-15.
 */

@Entity
@Table(name = "USERS")
public class User implements UserDetails, Serializable {
	
  private static final long serialVersionUID = 7302167612766148880L;

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "id", updatable = false, nullable = false, unique = true)
  private Long id;

  @Column(name = "username")
  private String username;

  @JsonIgnore
  @Column(name = "password")
  private String password;

  @Column(name = "first_name")
  private String firstName;

  @Column(name = "last_name")
  private String lastName;
  
  @Column(name = "email", unique = true, nullable = false)
  private String email;
  
//  @NotNull
  @Column(name = "enabled")
  private Boolean enabled;
  
  @Column(name = "last_password_reset_date")
  @Temporal(TemporalType.TIMESTAMP)
  private Date lastPasswordResetDate;

  @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
  @JoinTable(name = "USER_AUTHORITY",
      joinColumns = @JoinColumn(name = "user_id", referencedColumnName = "id"),
      inverseJoinColumns = @JoinColumn(name = "authority_id", referencedColumnName = "id"))
  private List<Authority> authorities = new ArrayList<>();
  
  @OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<UsersRetailers> usersRetailers = new ArrayList<UsersRetailers>();
	
	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<UsersSalesItems> usersSalesItems = new ArrayList<UsersSalesItems>();
	
	@OneToMany(mappedBy = "user", fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	private List<TrackingNumber> trackingNumbers = new ArrayList<TrackingNumber>();

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }
  
  public String getEmail() {
    return email;
  }

  public void setEmail(String email) {
	 this.email = email;
  }
  
  public Boolean getEnabled() {
      return enabled;
  }

  public void setEnabled(Boolean enabled) {
      this.enabled = enabled;
  }
  
  public Date getLastPasswordResetDate() {
      return lastPasswordResetDate;
  }

  public void setLastPasswordResetDate(Date lastPasswordResetDate) {
      this.lastPasswordResetDate = lastPasswordResetDate;
  }

  public void setAuthorities(List<Authority> authorities) {
    this.authorities = authorities;
  }
  
  public boolean addAuthority(Authority authority) {
	  if(!this.authorities.contains(authority)){
		  return this.authorities.add(authority);
	  }
	  return false;
  }

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return this.authorities;
  }

  // We can add the below fields in the users table.
  // For now, they are hardcoded.
  @JsonIgnore
  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @JsonIgnore
  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @JsonIgnore
  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @JsonIgnore
  @Override
  public boolean isEnabled() {
    return true;
  }
  
  public List<UsersRetailers> getUsersRetailers() {
		return usersRetailers;
	}

	public void setUsersRetailers(List<UsersRetailers> usersRetailers) {
		this.usersRetailers = usersRetailers;
	}
	
	public boolean addUsersRetailers(UsersRetailers usersRetailer){
		if(!usersRetailers.contains(usersRetailer)){
			return usersRetailers.add(usersRetailer);
		}
		return false;
	}

	public List<UsersSalesItems> getUsersSalesItems() {
		return usersSalesItems;
	}

	public void setUsersSalesItems(List<UsersSalesItems> usersSalesItems) {
		this.usersSalesItems = usersSalesItems;
	}
	
	public List<TrackingNumber> getTrackingNumbers() {
		return trackingNumbers;
	}

	public void setTrackingNumbers(List<TrackingNumber> trackingNumbers) {
		this.trackingNumbers = trackingNumbers;
	}
	
	public boolean addSalesItem(UsersSalesItems usersSalesItem){
		if(!usersSalesItems.contains(usersSalesItem)){
			return usersSalesItems.add(usersSalesItem);
		}
		return false;
	}

	
	
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((username == null) ? 0 : username.hashCode());
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
		User other = (User) obj;
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equals(other.username))
			return false;
		return true;
	}
	
	
}
