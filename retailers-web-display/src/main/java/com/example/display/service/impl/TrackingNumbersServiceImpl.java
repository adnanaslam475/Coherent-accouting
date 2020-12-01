package com.example.display.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.example.display.adapter.TrackingNumberAdapter;
import com.example.display.adapter.reverse.TrackingNumberAdapterReverse;
import com.example.display.api.TrackingNumberApi;
import com.example.display.exception.ResourceNotFoundException;
import com.example.display.model.TrackingNumber;
import com.example.display.pagination.PageWrapper;
import com.example.display.repository.TrackingNumbersRepo;
import com.example.display.service.TrackingNumbersService;

@Service
public class TrackingNumbersServiceImpl implements TrackingNumbersService {
	
	public static final Logger logger = LoggerFactory.getLogger(TrackingNumbersServiceImpl.class);
	
	@Autowired
	private TrackingNumbersRepo trackingNumbersRepo;
	
	@Autowired
	private TrackingNumberAdapter trackingNumberAdapter;
	
	@Autowired
	private TrackingNumberAdapterReverse trackingNumberAdapterReverse;

	@Override
	public boolean deleteTrackingNumberById(Long id) {
//		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
//		String userUsername = currentUser.getName();
		TrackingNumber number = trackingNumbersRepo.findOne(id);
		if (number == null) {
			logger.error("Unable to delete. Tracking Number with trackingNumber {} not found.", id);
			throw new ResourceNotFoundException(String.valueOf(id), "Tracking Number not found");
		}
		this.trackingNumbersRepo.delete(number);
		return true;
	}

	@Override
	public PageWrapper<TrackingNumberApi> listTrackingNumbersByPage(Integer pageNumber, Integer pageSize) {
		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		String userUsername = currentUser.getName();
		PageRequest request = new PageRequest(pageNumber - 1, pageSize, Sort.Direction.ASC, "id");

		Page<TrackingNumber> trackingNumbers = trackingNumbersRepo.findByUserUsername(userUsername, request);

		List<TrackingNumberApi> list = new ArrayList<>();

		for (TrackingNumber trackingNumber : trackingNumbers.getContent()) {
			TrackingNumberApi api = trackingNumberAdapter.adaptTrackingNumber(trackingNumber);
			list.add(api);
		}

		PageWrapper<TrackingNumberApi> wrapper = new PageWrapper<>(list, trackingNumbers.getTotalElements());

		return wrapper;
	}
	
	@Override
	public TrackingNumber saveTrackingNumber(TrackingNumberApi trackingNumberApi) {

		Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
		String userUsername = currentUser.getName();
		TrackingNumber trackingNumberCheck = trackingNumbersRepo.findTrackingNumberForUser(trackingNumberApi.getTrackingNumber(), userUsername);

		if (trackingNumberCheck == null) {
			TrackingNumber trackingNumber = trackingNumberAdapterReverse.adaptTrackingNumber(null, trackingNumberApi, userUsername);
			return trackingNumbersRepo.save(trackingNumber);
		} 
		return trackingNumberCheck;

	}

}
