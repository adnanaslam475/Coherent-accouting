package com.example.display.exception;

import java.io.FileNotFoundException;

import org.apache.poi.EncryptedDocumentException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ExceptionHandling {

	@ExceptionHandler(ResourceConflictException.class)
	public ResponseEntity<ExceptionResponse> resourceConflict(ResourceConflictException ex) {
		ExceptionResponse response = new ExceptionResponse();
		response.setErrorCode("Conflict");
		response.setErrorMessage(ex.getMessage());
		return new ResponseEntity<ExceptionResponse>(response, HttpStatus.CONFLICT);
	}

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ExceptionResponse> resourceNotFound(ResourceNotFoundException ex) {
		ExceptionResponse response = new ExceptionResponse();
		response.setErrorCode("Not Found");
		response.setErrorMessage(ex.getMessage());

		return new ResponseEntity<ExceptionResponse>(response, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(InvalidTokenException.class)
	public ResponseEntity<ExceptionResponse> invalidToken(InvalidTokenException ex) {
		ExceptionResponse response = new ExceptionResponse();
		response.setErrorCode("Invalid Token");
		response.setErrorMessage(ex.getMessage());

		return new ResponseEntity<ExceptionResponse>(response, HttpStatus.CONFLICT);
	}

	@ExceptionHandler(TokenExpiredException.class)
	public ResponseEntity<ExceptionResponse> tokenExpired(TokenExpiredException ex) {
		ExceptionResponse response = new ExceptionResponse();
		response.setErrorCode("Token Expired!");
		response.setErrorMessage(ex.getMessage());

		return new ResponseEntity<ExceptionResponse>(response, HttpStatus.CONFLICT);
	}

	@ExceptionHandler(EmailException.class)
	public ResponseEntity<ExceptionResponse> emailException(EmailException ex) {
		ExceptionResponse response = new ExceptionResponse();
		response.setErrorCode("Could not send email");
		response.setErrorMessage(ex.getMessage());

		return new ResponseEntity<ExceptionResponse>(response, HttpStatus.CONFLICT);
	}

	@ExceptionHandler(FileNotFoundException.class)
	public ResponseEntity<ExceptionResponse> fileNotFound(FileNotFoundException ex) {
		ExceptionResponse response = new ExceptionResponse();
		response.setErrorCode("The File is empty!");
		response.setErrorMessage(ex.getMessage());

		return new ResponseEntity<ExceptionResponse>(response, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(EncryptedDocumentException.class)
	public ResponseEntity<ExceptionResponse> fileNotCorrectFormat(EncryptedDocumentException ex) {
		ExceptionResponse response = new ExceptionResponse();
		response.setErrorCode("Wrong file format!");
		response.setErrorMessage(ex.getMessage());

		return new ResponseEntity<ExceptionResponse>(response, HttpStatus.BAD_REQUEST);
	}
	

}
