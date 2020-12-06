package com.application.shopapp.exceptionhandler;

public class CategoryNotFoundException extends RuntimeException {
    String errorId;

    public CategoryNotFoundException(String errorId,String message)
    {
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
