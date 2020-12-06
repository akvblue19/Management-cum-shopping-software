package com.application.shopapp.exceptionhandler;


import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Date;


@ControllerAdvice
@RestController
public class GenericExceptionHandling extends ResponseEntityExceptionHandler // Abstract Class
{
    @ExceptionHandler(Exception.class)
    ResponseEntity<Object> handleAllException(Exception ex, WebRequest request)
    {
        ExceptionResponse exceptionResponse=
                new ExceptionResponse(new Date(),ex.getMessage(),request.getDescription(false));
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(UserNotFoundException.class)
    ResponseEntity<Object> handleAllUserException(Exception ex, WebRequest request,UserNotFoundException ux)
    {
        ExceptionResponse exceptionResponse=
                new ExceptionResponse(new Date(),ux.getErrorId(),ex.getMessage(),request.getDescription(false));
        return new ResponseEntity<>(exceptionResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(CategoryNotFoundException.class)
    ResponseEntity<Object> handleAllCategoryException(Exception ex, WebRequest request,CategoryNotFoundException cx)
    {
        ExceptionResponse exceptionResponse=
                new ExceptionResponse(new Date(),cx.errorId,ex.getMessage(),request.getDescription(false));
        return new ResponseEntity<>(exceptionResponse, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(ProductNotFoundException.class)
    ResponseEntity<Object> handleAllProductException(Exception ex, WebRequest request,ProductNotFoundException px)
    {
        ExceptionResponse exceptionResponse =
                new ExceptionResponse(new Date(),px.getErrorId(),ex.getMessage(),request.getDescription(false));
        return new ResponseEntity<>(exceptionResponse, HttpStatus.NOT_FOUND);
    }

    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex, HttpHeaders headers, HttpStatus status, WebRequest request) {

        ExceptionResponse exceptionResponse =      //ex.getmessage()
                new ExceptionResponse(new Date(),"Validation Failed",ex.getBindingResult().toString());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);

    }
}