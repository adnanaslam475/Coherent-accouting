package com.example.crawler.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.crawler.model.ExternalAccount;


public interface ExternalAccountRepo extends JpaRepository<ExternalAccount, Long> {
	
List<ExternalAccount>findByAccountType(String accountType);

}
