package com.example.display.service;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.IOException;

import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

/**
 * Created by fan.jin on 2016-10-15.
 */
public interface FileUploadService {
	

	ResponseEntity<?> uploadFile(MultipartFile file) throws FileNotFoundException;
	
	ResponseEntity<?> uploadExcellFile(MultipartFile file) throws FileNotFoundException;
	
	ResponseEntity<Resource> downloadFile(String filename) throws IOException;
  
}
