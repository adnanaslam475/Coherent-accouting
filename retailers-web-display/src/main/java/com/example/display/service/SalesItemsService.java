package com.example.display.service;

import com.example.display.api.SalesItemApi;
import com.example.display.model.SalesItem;
import com.example.display.pagination.PageWrapper;

public interface SalesItemsService {

  boolean deleteSalesItemById(Long salesItemId);
  
  SalesItem saveSalesItem(SalesItemApi salesItemApi);
  
  PageWrapper<SalesItemApi> listSalesItemsByPage(Integer pageNumber, Integer pageSize);
  
  PageWrapper<SalesItemApi> listSalesItemsByPagePerRetailer(String retailerUsername, Integer pageNumber, Integer pageSize);
  
}
