package com.example.display.service;

import java.util.Set;

import com.example.display.api.RetailerApi;
import com.example.display.model.Retailer;
import com.example.display.model.User;
import com.example.display.pagination.PageWrapper;

public interface RetailerService {

  Retailer saveRetailer(RetailerApi retailerApi, User user);
  
  boolean saveRetailers(Set<RetailerApi> retailers);
  
  boolean deleteRetailerByUsername(String retailerUsername);
  
  PageWrapper<RetailerApi> listRetailersByPage(Integer pageNumber, Integer pageSize);
  
}
