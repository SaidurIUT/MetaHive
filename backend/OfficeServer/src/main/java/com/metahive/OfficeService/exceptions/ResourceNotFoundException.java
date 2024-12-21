package com.metahive.OfficeService.exceptions;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String resource, String field, Long value) {
        super(String.format("%s not found with %s: %d", resource, field, value));
    }
}