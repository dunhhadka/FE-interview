package org.example.demo.application.exception;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import org.example.demo.application.utils.JsonUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class HandlerException {

//    @ExceptionHandler(ConstrainViolationException.class)
//    public void handle(ConstrainViolationException exception, HttpServletResponse response) throws IOException {
//        response.setStatus(exception.getStatus());
//        String errorMessage = exception.getMessage();
//        response.setContentType("application/json");
//
//        ErrorResponse errorResponse = new ErrorResponse(exception.getMessage());
//
//        PrintWriter out = response.getWriter();
//        out.write(JsonUtils.marshal(errorResponse));
//        out.flush();
//    }

    @ExceptionHandler(ConstrainViolationException.class)
    public ResponseEntity<Map<String, String>> handle(ConstrainViolationException exception) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("message", exception.getMessage());
        return new ResponseEntity<>(errorResponse, HttpStatus.BAD_REQUEST);
    }

    @AllArgsConstructor
    private static class ErrorResponse {
        @JsonProperty("message")
        private String message;
    }
}
