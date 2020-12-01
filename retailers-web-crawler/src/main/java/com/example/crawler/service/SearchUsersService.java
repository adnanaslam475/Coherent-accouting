package com.example.crawler.service;

import java.io.IOException;
import java.util.Map;
import java.util.Set;

import com.example.crawler.api.RetailerApi;
import com.example.crawler.api.SearchUsersParametersApi;

public interface SearchUsersService {

	Map<String, Set<RetailerApi>> searchUsers(SearchUsersParametersApi searchUsersParametersApi) throws IOException;

}
