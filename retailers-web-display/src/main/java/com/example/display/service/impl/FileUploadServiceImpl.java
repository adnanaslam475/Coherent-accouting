package com.example.display.service.impl;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashSet;
import java.util.Set;


import org.apache.commons.lang3.StringUtils;
import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.display.api.RetailerApi;
import com.example.display.service.FileUploadService;
import com.example.display.service.RetailerService;

@Service
public class FileUploadServiceImpl implements FileUploadService {

	public static final Logger logger = LoggerFactory.getLogger(FileUploadServiceImpl.class);
	
	private static final String RETAILER_ALIAS = "Seller";
	
	private static final String RETAILER_ITEMS_ALIAS = "Seller Items";
	
	private static final String FEEDBACK_ALIAS = "Feedbacks";
	
	public static final String RETAILER_URL = "https://www.ebay.com/usr/";
	
	private static final String EXCELL_FILE_NAME = "Example_File_Upload";

	@Autowired
	private RetailerService retailerService;

	@Override
	public ResponseEntity<Boolean> uploadFile(MultipartFile file) throws FileNotFoundException {

		if (!file.isEmpty()) {

			Set<String> retailers = new HashSet<>();
			try (InputStream inputStream = file.getInputStream();
					BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(inputStream, "UTF-8"));) {

				String line;
				while ((line = bufferedReader.readLine()) != null) {
					String[] allRetailers = line.replace(" ", ",").replace("\t", ",").split(",");
					for (int i = 0; i < allRetailers.length; i++) {
						String retailer = allRetailers[i].trim();
						if (retailer != null && retailer.length() > 0) {
							System.out.println(retailer);
							retailers.add(retailer);
						}
					}
				}
				
				Set<RetailerApi> toSave = new HashSet<>();
				
				for (String one : retailers) {
					if(StringUtils.isNotBlank(one)) {
						RetailerApi retailerApi = new RetailerApi();
						retailerApi.setRetailerUsername(one);
						retailerApi.setUrl(RETAILER_URL + one);
						toSave.add(retailerApi);
					}
				}

				retailerService.saveRetailers(toSave);
				logger.info("Retailers saved!");
				return new ResponseEntity<Boolean>(true, HttpStatus.CREATED);
			} catch (IOException e) {
				logger.info("Message:" + e.getMessage());
				return new ResponseEntity<Boolean>(false, HttpStatus.INTERNAL_SERVER_ERROR);
			}
		} else {
			throw new FileNotFoundException("Please select a non empty file!");
		}

	}

	@Override
	public ResponseEntity<Boolean> uploadExcellFile(MultipartFile file) {
		
		Set<RetailerApi> toSave = new HashSet<>();
        try {
//        	File excell = generateFileFromMultipart(file);
//        	Workbook workbook = Workbook.getWorkbook(new File(stream));
        	// Creating a Workbook from an Excel file (.xls or .xlsx)
//			Workbook workbook = WorkbookFactory.create(excell);
        	try (InputStream stream2 = file.getInputStream();) {
        		Workbook workbook = WorkbookFactory.create(stream2);
        		Sheet sheet = workbook.getSheetAt(0);
        		int totalNumberRows = sheet.getLastRowNum();
        		int firstRowNum = sheet.getFirstRowNum();
        		Row textRow = sheet.getRow(firstRowNum);
        		if(isTableBasedExcell(textRow)) {
        			for (int i = firstRowNum + 1; i <= totalNumberRows; i ++) {
        				Row nextRow = sheet.getRow(i);
        				RetailerApi retailer = createRetailer(textRow, nextRow);
        				if(retailer.getRetailerUsername() != null) {
        					toSave.add(retailer);
        				}
        			}
        		} else {
        			for (Row row: sheet) {
        	            for(Cell cell: row) {
        	                RetailerApi retailer = createRetailer(cell);
        	                toSave.add(retailer);
        	            }
        	        }
        		}
        	}
        	retailerService.saveRetailers(toSave);
		} catch (EncryptedDocumentException | InvalidFormatException | IOException e) {
			throw new EncryptedDocumentException("The file uploaded is not .xls or xslx!");
		} catch (Exception e) {
			return new ResponseEntity<Boolean>(false, HttpStatus.INTERNAL_SERVER_ERROR);
		}
        return new ResponseEntity<Boolean>(true, HttpStatus.CREATED);
	}
	
	private File generateFileFromMultipart(MultipartFile file) throws IOException {
		File convFile = new File(file.getOriginalFilename());
	    convFile.createNewFile();
	    try(FileOutputStream fos = new FileOutputStream(convFile);) {
	    	fos.write(file.getBytes());
//	    	fos.close(); 
	    }
	    return convFile;
	}
	
	private boolean isTableBasedExcell(Row textRow) {
		for(Cell cell: textRow) {
			String cellValue = cell.getStringCellValue();
			if (cellValue.contains(RETAILER_ALIAS) 
				|| cellValue.contains(RETAILER_ITEMS_ALIAS)
				|| cellValue.contains(FEEDBACK_ALIAS)) {
				return true;
			}
		}
		return false;
	}
	
	private RetailerApi createRetailer (Row textRow, Row nextRow) {
		RetailerApi retailer = new RetailerApi();
		for(Cell cell: textRow) {
			int columnIndex = cell.getColumnIndex();
			String cellValue = cell.getStringCellValue();
			if (cellValue.equalsIgnoreCase(RETAILER_ALIAS)) {
				String retailerUsername = nextRow.getCell(columnIndex).getStringCellValue();
				retailer.setRetailerUsername(retailerUsername);
				retailer.setUrl(RETAILER_URL + retailerUsername);
			} else if (cellValue.equalsIgnoreCase(RETAILER_ITEMS_ALIAS)) {
				double retailerItems = nextRow.getCell(columnIndex).getNumericCellValue();
				retailer.setSellerListings((int)retailerItems);
			} else if (cellValue.equalsIgnoreCase(FEEDBACK_ALIAS)) {
				double retailerFeedback = nextRow.getCell(columnIndex).getNumericCellValue();
				retailer.setFeedbackScore((int)retailerFeedback);
			} 
		}
		return retailer;
	}
	
	private RetailerApi createRetailer(Cell cell) {
		RetailerApi retailer = new RetailerApi();
		String retailerUsername = cell.toString();
		retailer.setRetailerUsername(retailerUsername);
		retailer.setUrl(RETAILER_URL + retailerUsername);
		return retailer;
	}
	
	public ResponseEntity<Resource> downloadFile(String filename) throws IOException {
		InputStream file = null;
		if(filename.equals(EXCELL_FILE_NAME)) {
			file = new ClassPathResource(filename.concat(".xlsx")).getInputStream();
			InputStreamResource resource = new InputStreamResource(file);
			return ResponseEntity.ok()
//				.header("Content-Disposition", "attachment; filename=" + file.getName())
					.contentType(MediaType.parseMediaType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")).body(resource);
		} else {
			file = new ClassPathResource(filename.concat(".txt")).getInputStream();
			InputStreamResource resource = new InputStreamResource(file);
//			HttpHeaders headers = new HttpHeaders();
//	        headers.setContentType(MediaType.valueOf("application/txt"));
//			return new ResponseEntity<>(resource, headers, HttpStatus.OK);
			return ResponseEntity.ok()
//				.header("Content-Disposition", "attachment; filename=" + file.getName())
					.contentType(MediaType.parseMediaType("text/plain")).body(resource);
		}

	}

}
