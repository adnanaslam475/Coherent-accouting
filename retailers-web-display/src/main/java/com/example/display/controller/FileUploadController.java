package com.example.display.controller;

import java.io.FileNotFoundException;
import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.display.service.FileUploadService;

/**
 * Created by fan.jin on 2017-05-08.
 */

@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class FileUploadController {

	public static final Logger logger = LoggerFactory.getLogger(FileUploadController.class);

	@Autowired
	private FileUploadService fileUploadService;

	@RequestMapping(value = "/uploadFile", method = RequestMethod.POST)
	public ResponseEntity<?> uploadFileHandler(@RequestParam("multipartFile") MultipartFile multipartFile)
			throws FileNotFoundException {
		String fileName = multipartFile.getOriginalFilename();
		if (fileName.endsWith(".xlsx") || fileName.endsWith(".xls")) {
			return fileUploadService.uploadExcellFile(multipartFile);
		} else {
			return fileUploadService.uploadFile(multipartFile);
			
		}
	}
	
//	@Produces("application/vnd.ms-excel")
	@RequestMapping(value = "/download-example/{filename}", method = RequestMethod.GET)
	public ResponseEntity<Resource> downloadExample(@PathVariable String filename) throws IOException {
		return fileUploadService.downloadFile(filename);
		
	}

}
