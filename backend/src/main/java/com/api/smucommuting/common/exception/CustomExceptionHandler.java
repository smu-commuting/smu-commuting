package com.api.smucommuting.common.exception;

import com.api.smucommuting.common.dto.ErrorResponse;
import com.api.smucommuting.common.exception.mail.MailSendException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletResponse;

@RestControllerAdvice
public class CustomExceptionHandler {
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> businessExceptionHandler(EntityNotFoundException ex) {
        ErrorResponse response = ErrorResponse.build(HttpServletResponse.SC_BAD_REQUEST, ex);

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MailSendException.class)
    public ResponseEntity<ErrorResponse> mailSenderExceptionHandler(MailSendException ex) {
        ErrorResponse response = ErrorResponse.build(HttpServletResponse.SC_BAD_REQUEST, ex);

        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
}
