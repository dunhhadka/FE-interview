package org.example.demo.application.model;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
public class LoginRequest {
    @NotBlank
    @Size(max = 50)
    private String email;

    @Size(max = 50)
    @NotBlank
    private String password;
}
