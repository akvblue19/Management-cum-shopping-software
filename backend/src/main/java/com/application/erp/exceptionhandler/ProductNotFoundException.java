package com.application.shopapp.exceptionhandler;

public class ProductNotFoundException extends RuntimeException {

    String errorId;

    public ProductNotFoundException(String errorId,String message) {
        super(message);
        this.errorId = errorId;
    }

    public String getErrorId() {
        return errorId;
    }

    public void setErrorId(String errorId) {
        this.errorId = errorId;
    }
}
