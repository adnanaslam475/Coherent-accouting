package com.example.display.exception;

public class ResourceNotFoundException extends RuntimeException {
	
	private static final long serialVersionUID = -7081307747957401549L;
	private String resourceId;
	 
    public ResourceNotFoundException(String resourceId, String message) {
        super(message);
        this.resourceId = resourceId;
    }

	public String getResourceId() {
		return resourceId;
	}

	public void setResourceId(String resourceId) {
		this.resourceId = resourceId;
	}
    

    
}
