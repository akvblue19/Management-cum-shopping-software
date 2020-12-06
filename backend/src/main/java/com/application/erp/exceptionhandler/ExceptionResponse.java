package com.application.shopapp.exceptionhandler;

import java.util.Date;

public class ExceptionResponse
{
    private Date date;
    private String message;
    private String Details;
    private String errorId;

    public ExceptionResponse(Date date, String message, String details) {
        super();
        this.date = date;
        this.message = message;
        this.Details = details;
    }

    public ExceptionResponse(Date date, String errorId, String message, String details) {
        super();
        this.date = date;
        this.errorId = errorId;
        this.message = message;
        this.Details = details;
    }

    public String getErrorId() {
        return errorId;
    }

    public void setErrorId(String errorId) {
        this.errorId = errorId;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getDetails() {
        return Details;
    }

    public void setDetails(String details) {
        this.Details = details;
    }

    @Override
    public String toString() {
        return "ExceptionResponse{" +
                "date=" + date +
                ", message='" + message + '\'' +
                ", Details='" + Details + '\'' +
                ", errorId='" + errorId + '\'' +
                '}';
    }
}