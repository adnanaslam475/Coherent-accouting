package com.example.display.controller;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.hibernate.validator.constraints.NotEmpty;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mobile.device.Device;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;

import com.example.display.api.JwtAuthenticationRequest;
import com.example.display.api.JwtAuthenticationResponse;
import com.example.display.api.ResetPasswordApi;
import com.example.display.model.User;
import com.example.display.service.AuthenticationService;
import com.example.display.util.JwtTokenUtil;

@RestController
@RequestMapping(value = "/api", produces = MediaType.APPLICATION_JSON_VALUE)
public class AuthenticationRestController {
	
	public static final String FRONT_END_HOST_AND_PORT = "http://173.212.207.42:8080";
	
	public static final String NGINX_HOST_AND_PORT = "http://173.212.207.42:8084";
	
	public static final Logger logger = LoggerFactory.getLogger(AuthenticationRestController.class);

    @Value("${jwt.header}")
    private String tokenHeader;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private UserDetailsService userDetailsService;
    
    @Autowired
    private AuthenticationService authenticationService;

    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtAuthenticationRequest authenticationRequest, Device device) throws AuthenticationException {

        // Perform the security
        final Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        authenticationRequest.getUsername(),
                        authenticationRequest.getPassword()
                )
        );
        SecurityContextHolder.getContext().setAuthentication(authentication);

        // Reload password post-security so we can generate token
        final UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        final String token = jwtTokenUtil.generateToken(userDetails, device);

        // Return the token
        return ResponseEntity.ok(new JwtAuthenticationResponse(token));
    }

    @RequestMapping(value = "/refresh", method = RequestMethod.GET)
    public ResponseEntity<?> refreshAndGetAuthenticationToken(HttpServletRequest request) {
        String token = request.getHeader(tokenHeader);
        String authToken = token.substring(7);
        String username = jwtTokenUtil.getUsernameFromToken(authToken);
        User user = (User) userDetailsService.loadUserByUsername(username);

        if (jwtTokenUtil.canTokenBeRefreshed(authToken, user.getLastPasswordResetDate())) {
            String refreshedToken = jwtTokenUtil.refreshToken(authToken);
            return ResponseEntity.ok(new JwtAuthenticationResponse(refreshedToken));
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }
    
    @RequestMapping(value = "/regitration-confirm", method = RequestMethod.GET)
    public void confirmRegistration (WebRequest request, @RequestParam("token") String token, HttpServletRequest httpServletRequest,  HttpServletResponse httpServletResponse) throws IOException {
    	authenticationService.confirmRegistration(token, request);
    	httpServletResponse.sendRedirect(FRONT_END_HOST_AND_PORT + "/login");
    }
    
    @RequestMapping(value = "/user/forgot-password", method = RequestMethod.POST)
    public ResponseEntity<Void> forgotPassword (@RequestBody @Valid ForgotPasswordApi forgotPasswordApi, HttpServletRequest request) {
    	authenticationService.forgotPassword(forgotPasswordApi, request);
    	return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    @RequestMapping(value="/logout", method = RequestMethod.GET)
    public ResponseEntity<Void> logoutPage (HttpServletRequest request, HttpServletResponse response) {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null){
        	System.out.println("Auth:" + ((User)auth.getPrincipal()).getUsername());
            new SecurityContextLogoutHandler().logout(request, response, auth);
        }
        return new ResponseEntity<Void>(HttpStatus.OK);
    }
    
    @RequestMapping(value = "/user/forgot-password", method = RequestMethod.GET)
    public void resetForgotPassword(WebRequest request, @RequestParam("token") String token, HttpServletRequest httpServletRequest,  HttpServletResponse httpServletResponse) throws IOException {
    	String scheme = httpServletRequest.getScheme();             // http
	    String serverName = httpServletRequest.getServerName();     // hostname.com
    	authenticationService.resetForgotPassword(token, request);
    	httpServletResponse.sendRedirect(FRONT_END_HOST_AND_PORT + "/reset-password?token=" + token);
    }
    
    @RequestMapping(value = "/user/save-forgot-password", method = RequestMethod.POST)
    public ResponseEntity<Void> saveForgotPassword (@RequestBody @Valid ResetPasswordApi resetPasswordApi, 
    		HttpServletRequest request) {
      
    	authenticationService.saveForgotPassword(resetPasswordApi);
    	return new ResponseEntity<Void>(HttpStatus.OK);
        
    }
    
    public static class ForgotPasswordApi {
    	
    	@NotEmpty
		private String email;

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}
	}
    
}
