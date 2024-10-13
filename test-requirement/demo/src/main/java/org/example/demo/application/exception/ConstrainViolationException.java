package org.example.demo.application.exception;

import lombok.Getter;

@Getter
public class ConstrainViolationException extends RuntimeException {
    private int status;
    private String message;

    public ConstrainViolationException(int status, String message) {
        this.status = status;
        this.message = message;
    }
}
