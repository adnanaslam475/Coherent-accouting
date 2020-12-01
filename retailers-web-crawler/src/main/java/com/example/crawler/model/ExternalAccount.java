package com.example.crawler.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "EXTERNAL_ACCOUNTS")
public class ExternalAccount implements Serializable{
	
	private static final long serialVersionUID = -2391864684725817933L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", updatable = false, nullable = false, unique = true)
	private long id;
	
	@Column(name = "account_type", length = 250)
	private String accountType;
	
	@Column(name = "associate_tag", length = 250)
	private String associateTag;
	
	@Column(name = "aws_access_key", length = 250)
	private String awsAccessKey;
	
	@Column(name = "aws_secret_key", length = 250)
	private String awsSecretKey;
	
	@Column(name = "account_id", length = 250)
	private String accountId;
	
	 
	
	
	



	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getAccountType() {
		return accountType;
	}

	public void setAccountType(String accountType) {
		this.accountType = accountType;
	}

	public String getAssociateTag() {
		return associateTag;
	}

	public void setAssociateTag(String associateTag) {
		this.associateTag = associateTag;
	}

	public String getAwsAccessKey() {
		return awsAccessKey;
	}

	public void setAwsAccessKey(String awsAccessKey) {
		this.awsAccessKey = awsAccessKey;
	}

	public String getAwsSecretKey() {
		return awsSecretKey;
	}

	public void setAwsSecretKey(String awsSecretKey) {
		this.awsSecretKey = awsSecretKey;
	}

	public String getAccountId() {
		return accountId;
	}

	public void setAccountId(String accountId) {
		this.accountId = accountId;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((accountId == null) ? 0 : accountId.hashCode());
		result = prime * result + ((accountType == null) ? 0 : accountType.hashCode());
		result = prime * result + ((associateTag == null) ? 0 : associateTag.hashCode());
		result = prime * result + ((awsAccessKey == null) ? 0 : awsAccessKey.hashCode());
		result = prime * result + ((awsSecretKey == null) ? 0 : awsSecretKey.hashCode());
		result = prime * result + (int) (id ^ (id >>> 32));
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
		ExternalAccount other = (ExternalAccount) obj;
		if (accountId == null) {
			if (other.accountId != null)
				return false;
		} else if (!accountId.equals(other.accountId))
			return false;
		if (accountType == null) {
			if (other.accountType != null)
				return false;
		} else if (!accountType.equals(other.accountType))
			return false;
		if (associateTag == null) {
			if (other.associateTag != null)
				return false;
		} else if (!associateTag.equals(other.associateTag))
			return false;
		if (awsAccessKey == null) {
			if (other.awsAccessKey != null)
				return false;
		} else if (!awsAccessKey.equals(other.awsAccessKey))
			return false;
		if (awsSecretKey == null) {
			if (other.awsSecretKey != null)
				return false;
		} else if (!awsSecretKey.equals(other.awsSecretKey))
			return false;
		if (id != other.id)
			return false;
		return true;
	}

	


	
}
