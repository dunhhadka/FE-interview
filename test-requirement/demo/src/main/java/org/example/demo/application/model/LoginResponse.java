package org.example.demo.application.model;

import com.fasterxml.jackson.annotation.JsonRootName;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
@JsonRootName("login_response")
public class LoginResponse {
    private UserResponse user;
    private String token;
}
