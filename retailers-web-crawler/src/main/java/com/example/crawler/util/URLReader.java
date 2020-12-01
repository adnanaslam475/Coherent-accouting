package com.example.crawler.util;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

/**
 *
 * @author rajeev jha(xxx@yyy.com)
 * 
 */
public class URLReader {

	
	private static final Logger logger = LogManager.getLogger(URLReader.class);
	
	public static String read(String address) {
		StringBuilder builder = new StringBuilder();
		HttpURLConnection connection = null;
		try {
			URL url = new URL(address);
			connection = (HttpURLConnection)url.openConnection();
			String line;
			String response;
			long totalBytes = 0;
			try (BufferedReader reader = new BufferedReader(new InputStreamReader(connection.getInputStream()));) {
				while ((line = reader.readLine()) != null) {
					builder.append(line);
					totalBytes += line.getBytes("UTF-8").length;
				}
			}
		} catch (Exception e) {
			logger.error("Error during Rrading URL : {} Message {} ", address, e.getMessage());
			
		} finally {
			if(connection!=null) {
				connection.disconnect();
			}
		}
		//connection.setRequestProperty("User-Agent", "Mozilla/5.0 (Windows; U; Windows NT 6.1; zh-CN; rv:1.9.2.8) Gecko/20100722 Firefox/3.6.8");

		
		return builder.toString();
	}

}
