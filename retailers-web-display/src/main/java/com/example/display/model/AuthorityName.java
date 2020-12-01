package com.example.display.model;

public enum AuthorityName {
	
	ROLE_USER("ROLE_USER"),
	ROLE_ADMIN("ROLE_ADMIN");
	
	private final String name;
	AuthorityName(String name) { this.name = name; }
    public String getValue() { 
    	
    	return name; 
    	
    }
    
//    public AuthorityName getName(String name) {
//	    for (AuthorityName value : AuthorityName.values()) {
//	    	  if(name.equalsIgnoreCase(value.getValue())) {
//	    		  return value;
//	    	  }
//	    }
//	    return null;
//    }

}
