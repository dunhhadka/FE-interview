package org.example.demo.application.model;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Size;

@Getter
@Setter
public class UserRequest {
    @Size(max = 50)
    private String firstName;
    @Size(max = 50)
    private String lastName;
    @Size(max = 50)
    private String age;
    @Size(max = 50)
    private String fullName;
    @Size(max = 50)
    private String email;
    @Size(max = 20, min = 10)
    private String password;
}
