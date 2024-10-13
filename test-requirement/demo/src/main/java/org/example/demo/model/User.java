package org.example.demo.model;

import lombok.Getter;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Size;
import java.util.List;

@Getter
@Setter
@Document(collection = "users")
public class User {
    @Id
    private String id;
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
    private boolean login;
    private List<String> tokenSessions;
}
