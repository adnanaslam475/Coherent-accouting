package com.example.display.service;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.context.request.WebRequest;

import com.example.display.api.ResetPasswordApi;
import com.example.display.controller.AuthenticationRestController.ForgotPasswordApi;

public interface AuthenticationService {
	
  void confirmRegistration(String token, WebRequest request);
  void forgotPassword(ForgotPasswordApi forgotPasswordApi, HttpServletRequest request);
  void resetForgotPassword(String token, WebRequest request);
  void saveForgotPassword(ResetPasswordApi resetPasswordApi);

}
