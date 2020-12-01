package com.example.display.service;

import com.example.display.api.TrackingNumberApi;
import com.example.display.model.TrackingNumber;
import com.example.display.pagination.PageWrapper;

public interface TrackingNumbersService {

	boolean deleteTrackingNumberById(Long id);
	
	PageWrapper<TrackingNumberApi> listTrackingNumbersByPage(Integer pageNumber, Integer pageSize);
	
	TrackingNumber saveTrackingNumber(TrackingNumberApi trackingNumberApi);
}
