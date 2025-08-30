package com.example.rscarpoint.exception;

import com.example.rscarpoint.dto.ApiResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {
    
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<ApiResponseDto<String>> handleIllegalArgumentException(
            IllegalArgumentException ex, WebRequest request) {
        ApiResponseDto<String> response = new ApiResponseDto<>(false, ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
    
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponseDto<String>> handleResourceNotFoundException(
            ResourceNotFoundException ex, WebRequest request) {
        ApiResponseDto<String> response = new ApiResponseDto<>(false, ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }
    
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ApiResponseDto<String>> handleAccessDeniedException(
            AccessDeniedException ex, WebRequest request) {
        ApiResponseDto<String> response = new ApiResponseDto<>(false, "Access denied: " + ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.FORBIDDEN);
    }
    
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponseDto<String>> handleGlobalException(
            Exception ex, WebRequest request) {
        ApiResponseDto<String> response = new ApiResponseDto<>(false, "An unexpected error occurred: " + ex.getMessage());
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
