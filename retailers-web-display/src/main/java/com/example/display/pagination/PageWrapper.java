package com.example.display.pagination;

import java.util.List;

public class PageWrapper <T> {
	
    private long totalElements;
    
    private List<T> elements;
    
    public PageWrapper(List<T> elements, long totalElements) {
        this.elements = elements;
        this.totalElements = totalElements;
    }
    
    public long getTotalElements() {
        return totalElements;
    }
    
    public List<T> getElements() {
        return elements;
    }

}
