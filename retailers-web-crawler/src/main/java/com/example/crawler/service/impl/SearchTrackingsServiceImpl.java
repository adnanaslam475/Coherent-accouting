package com.example.crawler.service.impl;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.StringWriter;
import java.io.Writer;
import java.math.BigInteger;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;
import java.util.UUID;

import javax.xml.parsers.DocumentBuilder;
import javax.xml.parsers.DocumentBuilderFactory;
import javax.xml.parsers.ParserConfigurationException;
import javax.xml.transform.OutputKeys;
import javax.xml.transform.Transformer;
import javax.xml.transform.TransformerException;
import javax.xml.transform.TransformerFactory;
import javax.xml.transform.TransformerFactoryConfigurationError;
import javax.xml.transform.dom.DOMSource;
import javax.xml.transform.stream.StreamResult;
import javax.xml.xpath.XPath;
import javax.xml.xpath.XPathConstants;
import javax.xml.xpath.XPathExpression;
import javax.xml.xpath.XPathFactory;

import org.apache.commons.lang3.StringUtils;
import org.jsoup.Connection;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import org.w3c.dom.Node;
import org.w3c.dom.NodeList;

import com.example.crawler.api.TrackingNumberApi;
import com.example.crawler.constants.CrawlerConstants;
import com.example.crawler.model.ExternalAccount;
import com.example.crawler.model.TrackingNumber;
import com.example.crawler.model.User;
import com.example.crawler.repository.ExternalAccountRepo;
import com.example.crawler.repository.TrackingHeapRepo;
import com.example.crawler.repository.TrackingNumberRepo;
import com.example.crawler.repository.UserRepository;
import com.example.crawler.service.SearchTrackingNumbersService;

@Service
public class SearchTrackingsServiceImpl implements SearchTrackingNumbersService {

	public static final Logger logger = LoggerFactory.getLogger(SearchTrackingsServiceImpl.class);
	
	 DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMMM d, yyyy", Locale.US);
	 
	 private static final int MAX_METHOD_PROCESSING = 60000; // 60 sec
	 
	 private static final String USPS_URL = "https://tools.usps.com/go/TrackConfirmAction?tRef=fullpage&tLc=1&text28777=&tLabels=";
	 
	 private static final String USPS_XML_URL = "http://production.shippingapis.com/ShippingAPI.dll?API=TrackV2&XML=";

	@Autowired
	private UserRepository userRepository;

	@Autowired
	private TrackingNumberRepo trackingNumberRepo;
	
	@Autowired
	private TrackingHeapRepo trackingHeapRepo;

	
	@Autowired
	private ExternalAccountRepo externalAccountRepo;
	
//	@Autowired
//	private AnonymousProxyRepo anonymousProxyRepo;
	
	@Override        
	public Boolean searchTrackings(String startNumber, String userUsername) {
		User user = userRepository.findByUsername(userUsername);

		BigInteger start = new BigInteger(startNumber.trim());
		BigInteger incr = new BigInteger("7");
		BigInteger counter = new BigInteger("0");

		int totalCounter = 0;
		int foundTrackings = 0;
		logger.info("Start tracking search for user: {}", userUsername);
		long startTime = System.currentTimeMillis();
		while (foundTrackings <= 15 && totalCounter <= 20 && (System.currentTimeMillis()-startTime) <= MAX_METHOD_PROCESSING) {
			StringBuilder sb = new StringBuilder();
			for (int i = 0; i < 30; i ++) {
				counter = counter.add(incr);
				BigInteger check = start.add(counter);
				String trackingNumber = check.toString();
				sb.append(trackingNumber).append("%2C");
			}
			
			String URL = USPS_URL + sb.toString();
			System.out.println(URL);
			totalCounter++;
			Document document = null;
			try {
				Thread.sleep(2000);

				Connection con = Jsoup.connect(URL).userAgent(
						"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/535.21 (KHTML, like Gecko) Chrome/19.0.1042.0 Safari/535.21")
						.timeout(5 * 1000);
				Connection.Response resp = con.execute();
				
				if (resp.statusCode() == 200) {
					document = con.get();
					
					Elements elements = document.select("div.product_summary");
					for (Element el : elements) {
						if(el.child(2).select("h2 strong").text().equals("Delivered")) {
							String trackingNumber = el.child(0).select("span.tracking-number").text();
							//January 22, 2018 at 4:09 pm
							String date = el.child(2).child(2).child(0).text();
							//January 22, 2018
							String parsed = date.substring(0, date.indexOf("at") - 1);
							//BELLEVUE, KY 41073 
							String stateAndTown = el.child(2).child(2).child(2).text();
							logger.info("Found tracking number: {} ", trackingNumber);
							this.saveActionItem(trackingNumber, user, parsed,  stateAndTown);
							foundTrackings++;
						}
					}
				}

			} catch (IOException e) {
				logger.info("IOException: {} ", e.getMessage());
			} catch (InterruptedException e) {
				logger.info("InterruptedException: {} ", e.getMessage());
			} catch (Exception e) {
				logger.info("Exception: {} ", e.getMessage());
			} finally {
				long endTime = System.currentTimeMillis();
				if(endTime - startTime > MAX_METHOD_PROCESSING ) {
					break;
				}
			}
		}
		logger.info("Finished tracking search for user: {}", userUsername);
		return null;
	}

	@Transactional
	private synchronized void saveActionItem(String trackingNumber, User user, String date, String stateAndTown) {
		if (StringUtils.isNotBlank(trackingNumber)) {
			
			TrackingNumber trackingCheck = trackingNumberRepo.findTrackingNumberForUser(trackingNumber, user.getUsername());
			if (trackingCheck == null) {
				TrackingNumber tracking = new TrackingNumber();
				tracking.setTrackingNumber(trackingNumber);
				LocalDateTime deliveryDate = convertDate(date);
				tracking.setShippingDate(deliveryDate);
				
				String parsed = stateAndTown.trim();
				//BELLEVUE KY 41073 
//			String[] arrayStateAndTown = parsed.replace(",", "").split("\\u00A0");
//			System.out.println(arrayStateAndTown[0]);
//			System.out.println(arrayStateAndTown[1]);
				String city = parsed.substring(0, parsed.indexOf(","));
				String state = parsed.substring(parsed.indexOf(",") + 2, parsed.indexOf(",") + 4);
//			String postalCode = parsed.replaceAll("\\D+","");
				String postalCode2 = parsed.substring(parsed.indexOf(state) + 3, parsed.length() - 1);
				tracking.setShippingCity(city.concat(", ").concat(postalCode2));
				tracking.setShippingState(state);
				tracking.setUser(user);
				this.trackingNumberRepo.save(tracking);
			}
		}
	}
	
	private LocalDateTime convertDate(String date) {
		if(StringUtils.isNotBlank(date)) {
			LocalDate ld = LocalDate.parse(date, formatter);
			LocalDateTime localDate = ld.atStartOfDay();
			return localDate;
		}
		return null;
	}
	
	private String convertDateString(String date) {
		if(StringUtils.isNotBlank(date)) {
			LocalDate ld = LocalDate.parse(date, formatter);
			LocalDateTime localDate = ld.atStartOfDay();
			DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
			return localDate.format(formatter);
		}
		return null;
	}
	
	@Override
	public Map<Boolean, Map<String, Set<TrackingNumberApi>>> searchTrackingsViaXML(String startNumber, String userUsername) {
		
		List<ExternalAccount> externalAccounts = externalAccountRepo.findByAccountType("usps");
		ExternalAccount account = externalAccounts.get(0);
		Map<Boolean, Map<String, Set<TrackingNumberApi>>> response = new HashMap<>();
		Map<Boolean, Map<String, Set<TrackingNumberApi>>> validation = isValidFirstNUmber(startNumber, account);
		if(validation.get(false) != null) {
			return validation;
		}
		String requestId = UUID.randomUUID().toString();
		BigInteger start = new BigInteger(startNumber);
		BigInteger incr = new BigInteger("7");
		BigInteger counter = new BigInteger("0");

		int totalCounter = 0;
		int foundTrackings = 0;
		logger.info("Start tracking search for user: {}", userUsername);
		long startTime = System.currentTimeMillis();
		while (foundTrackings <= 15 && totalCounter <= 20 && (System.currentTimeMillis()-startTime) <= MAX_METHOD_PROCESSING) {
			
			List<String> thirtyTrackings = new ArrayList<>();
			for (int i = 0; i < 30; i ++) {
				counter = counter.add(incr);
				BigInteger check = start.add(counter);
				String trackingNumber = check.toString();
				thirtyTrackings.add(trackingNumber);
			}
			
			totalCounter++;
			try {
				String requestUrl = USPS_XML_URL + buildXMLTrackings(thirtyTrackings, account);
				RestTemplate restTemplate = new RestTemplate();
				String result = restTemplate.getForObject(requestUrl, String.class);
					XPath xpath = XPathFactory.newInstance().newXPath();
					try (InputStream is = new ByteArrayInputStream(result.getBytes("UTF-8"));) {
						DocumentBuilderFactory domFactory = DocumentBuilderFactory.newInstance();
						DocumentBuilder builder = domFactory.newDocumentBuilder();

						org.w3c.dom.Document doc = builder.parse(is);
						XPathExpression trackingList = xpath.compile("//TrackResponse/TrackInfo");

						NodeList nodes = (NodeList) trackingList.evaluate(doc, XPathConstants.NODESET);

						for (int i = 0; i < nodes.getLength(); i++) {

							Node node = nodes.item(i);
							String error = (String) xpath.evaluate("Error/Number", node, XPathConstants.STRING);
							if(StringUtils.isNotBlank(error) && Integer.parseInt(error) < 0) {
								continue;
							}
							
							String trackingNumber = node.getAttributes().getNamedItem("ID").getTextContent();
							String departureSummary = (String) xpath.evaluate("TrackSummary", node, XPathConstants.STRING);
							if(departureSummary.contains(CrawlerConstants.ONLY_SHIPPED_MESSAGE)) {
								TrackingNumberApi api = buildTrackingApi(trackingNumber, departureSummary, null);
								trackingHeapRepo.addTracking(requestId, api);
								foundTrackings++;
								continue;
							}
							
							NodeList shippingDetail = ((NodeList) xpath.evaluate("TrackDetail", node, XPathConstants.NODESET));
							Node shippingNode = shippingDetail.item(shippingDetail.getLength() - 1);
							String shippingDetails = shippingNode.getFirstChild().getTextContent();
							
							TrackingNumberApi api = buildTrackingApi(trackingNumber, departureSummary, shippingDetails);
							
							trackingHeapRepo.addTracking(requestId, api);
							foundTrackings++;
						}

					}

			} catch (Exception e) {
				logger.info("Exception: {} ", e.getMessage());
			} finally {
				long endTime = System.currentTimeMillis();
				if(endTime - startTime > MAX_METHOD_PROCESSING ) {
					break;
				}
			}
		}
		logger.info("Finished tracking search for user: {}", userUsername);
		Map<String, Set<TrackingNumberApi>> heapRepo = trackingHeapRepo.getTrackings();
		Map<String, Set<TrackingNumberApi>> usersForRequest = new HashMap<>();
    	Set<TrackingNumberApi> foundUsers = heapRepo.get(requestId);
    	usersForRequest.put(requestId, foundUsers);
    	heapRepo.remove(requestId);
		response.put(true, usersForRequest);
		return response;
	}
	
	private TrackingNumberApi buildTrackingApi(String trackingNumber, String trackSummary, String trackDetail) {
		TrackingNumberApi api= new TrackingNumberApi();
		api.setTrackingNumber(trackingNumber);
		api.setTrackingStatus("Transit");
		//Just shipped case
		if(StringUtils.isBlank(trackDetail)) {
			//obtain shipping information
			//December 18, 2017 in GERMANTOWN, TN 38138
			//March 4, 2018 in ETNA, OH 43018
			String information = trackSummary.substring(trackSummary.lastIndexOf(" on ") + 4, trackSummary.indexOf("."));
			
			//January 22, 2018
			String date = getDateFromInfoString(information);
			api.setShippingDate(date);
			
			//ETNA, OH 43018
			String stateAndTown = information.substring(information.indexOf("in") + 3, information.length());
			api.setShippingCity(getCityFromInfoString(stateAndTown));
			api.setShippingState(getStateFromInfoString(stateAndTown));
			return api;
		}
		
		if(StringUtils.isNotBlank(trackDetail) && trackDetail.contains(CrawlerConstants.PICK_UP_MESSAGE)) {
			String information = trackDetail.substring(trackDetail.lastIndexOf("USPS Awaiting Item,") + 20, trackDetail.length()).replace(".", "");
			//March 3, 2018, 4:44 am, WINDSOR, CT 06095
			String dateToParse = information.substring(0, information.indexOf(", ") + 6);
			//March 3, 2018
			String date = convertDateString(dateToParse);
			api.setShippingDate(date);
			
			String stateAndTown = null;
			if(information.contains("am")) {
				stateAndTown = information.substring(information.indexOf("am") + 4 , information.length());
			} else if (information.contains("pm")) {
				stateAndTown = information.substring(information.indexOf("pm") + 4 , information.length());
			}
			//ETNA, OH 43018
			api.setShippingCity(getCityFromInfoString(stateAndTown));
			api.setShippingState(getStateFromInfoString(stateAndTown));
			
//			if(trackSummary.contains(".")) {
//				//March 4, 2018 in LANCASTER, NY 14086
//				String summary = trackSummary.substring(trackSummary.lastIndexOf(" on ") + 4, trackSummary.indexOf(".")).replace(".", "");
//				
//				//January 22, 2018
//				String departureDate = getDateFromInfoString(summary);
//				api.setDepartureDate(departureDate);
//				
//				//ETNA, OH 43018
//				String departureStateAndTown = summary.substring(summary.indexOf("in") + 3, summary.length());
//				api.setDepartureCity(getCityFromInfoString(departureStateAndTown));
//				api.setDepartureState(getStateFromInfoString(departureStateAndTown));
//			}
			
		}
		return api;
	}
	
	private String getDateFromInfoString(String info) {
		String date = info.substring(0, info.indexOf("in") - 1);
		String shippingDate = convertDateString(date);
		return shippingDate;
	}
	
	private String getStateFromInfoString(String stateAndTown) {
		String parsed = stateAndTown.trim();
		String state = parsed.substring(parsed.indexOf(",") + 2, parsed.indexOf(",") + 4);
		return state;
	}
	
	private String getCityFromInfoString(String stateAndTown) {
		String parsed = stateAndTown.trim();
		String city = parsed.substring(0, parsed.indexOf(","));
		String state = parsed.substring(parsed.indexOf(",") + 2, parsed.indexOf(",") + 4);
		String postalCode = parsed.substring(parsed.lastIndexOf(state) + 3, parsed.length() - 1);
		return city.concat(", ").concat(postalCode);
	}
	
	private String buildXMLTrackings(List<String> thirtyTrackings, ExternalAccount account) {
		
		DocumentBuilderFactory documentBuilderFactory = DocumentBuilderFactory.newInstance();
        DocumentBuilder documentBuilder;
        Writer out = null;
		try {
			documentBuilder = documentBuilderFactory.newDocumentBuilder();
//			org.w3c.dom.Document document = documentBuilder.parse("server.xml");
//			org.w3c.dom.Element root = document.getDocumentElement();
//			Node node = document.createElement("TrackID");
//			root.appendChild(node);
			
			org.w3c.dom.Document doc = documentBuilder.newDocument();
            org.w3c.dom.Element mainRootElement = doc.createElement("TrackRequest");
            mainRootElement.setAttribute("USERID", account.getAccountId());
            doc.appendChild(mainRootElement);
 
            // append child elements to root element
            createTrackingXML(doc, mainRootElement, thirtyTrackings);
 
         // output DOM XML to console 
            Transformer tf = TransformerFactory.newInstance().newTransformer();
    		tf.setOutputProperty(OutputKeys.ENCODING, "UTF-8");
    		out = new StringWriter();
    		tf.transform(new DOMSource(doc), new StreamResult(out));
			
		} catch (ParserConfigurationException | TransformerFactoryConfigurationError | TransformerException e) {
			e.printStackTrace();
		}

		return out.toString();
	}
	
	private org.w3c.dom.Element createTrackingXML(org.w3c.dom.Document doc, org.w3c.dom.Element mainRootElement, List<String> trackingNumbers) {
		for(String trackingNumber : trackingNumbers) {
			org.w3c.dom.Element trackId = doc.createElement("TrackID");
			trackId.setAttribute("ID", trackingNumber);
			mainRootElement.appendChild(trackId);
		}
        return mainRootElement;
    }
	
	private Map<Boolean, Map<String, Set<TrackingNumberApi>>> isValidFirstNUmber(String startNumber, ExternalAccount account) {
		String requestUrl = USPS_XML_URL + buildXMLTrackings(Arrays.asList(startNumber), account);
		Map<Boolean, Map<String, Set<TrackingNumberApi>>> validationResponse = new HashMap<>();
		try {
			RestTemplate restTemplate = new RestTemplate();
			String result = restTemplate.getForObject(requestUrl, String.class);
				XPath xpath = XPathFactory.newInstance().newXPath();
				try (InputStream is = new ByteArrayInputStream(result.getBytes("UTF-8"));) {
					DocumentBuilderFactory domFactory = DocumentBuilderFactory.newInstance();
					DocumentBuilder builder = domFactory.newDocumentBuilder();
					org.w3c.dom.Document doc = builder.parse(is);
					XPathExpression trackingList = xpath.compile("//TrackResponse/TrackInfo");
					NodeList nodes = (NodeList) trackingList.evaluate(doc, XPathConstants.NODESET);
					Node node = nodes.item(0);
					String error = (String) xpath.evaluate("Error/Number", node, XPathConstants.STRING);
					String summary = (String) xpath.evaluate("TrackSummary", node, XPathConstants.STRING);
					if(StringUtils.isNotBlank(error) && Integer.parseInt(error) < 0) {
						Map<String, Set<TrackingNumberApi>> resp = new HashMap<>();
						resp.put("Please verify your tracking number!", new HashSet<>());
						validationResponse.put(false, resp);
						return validationResponse;
					} else if(StringUtils.isNotBlank(summary) && summary.contains("Please verify your tracking number!")) {
						Map<String, Set<TrackingNumberApi>> resp = new HashMap<>();
						resp.put("Please verify your tracking number!", new HashSet<>());
						validationResponse.put(false, resp);
						return validationResponse;
					} else if(StringUtils.isNotBlank(summary) && summary.contains("on ")) {
						Map<String, Set<TrackingNumberApi>> resp = new HashMap<>();
						resp.put("OK", new HashSet<>());
						validationResponse.put(true, resp);
						return validationResponse;
					}
					Map<String, Set<TrackingNumberApi>> resp = new HashMap<>();
					resp.put("Service not avaiable!", new HashSet<>());
					validationResponse.put(false, resp);
					return validationResponse;
				}

		} catch (Exception e) {
			logger.info("Exception: {} ", e.getMessage());
		}
		Map<String, Set<TrackingNumberApi>> resp = new HashMap<>();
		resp.put("Service not avaiable!", new HashSet<>());
		validationResponse.put(false, resp);
		return validationResponse;
	}
}
