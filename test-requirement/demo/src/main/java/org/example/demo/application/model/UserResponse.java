package org.example.demo.application.model;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.Size;

@Getter
@Builder
public class UserResponse {
    private String id;
    private String firstName;
    private String lastName;
    private String age;
    private String fullName;
    private String email;
    private String password;
}
