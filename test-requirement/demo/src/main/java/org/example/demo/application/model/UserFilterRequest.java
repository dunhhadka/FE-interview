package org.example.demo.application.model;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class UserFilterRequest {
    private String name;
    private int size;
    private int number;
}
