package org.example.demo.interfaces.rest;

import lombok.RequiredArgsConstructor;
import org.example.demo.application.model.*;
import org.example.demo.application.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/users")
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public UserResponse create(@RequestBody @Valid UserRequest request) {
        return userService.create(request);
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody @Valid LoginRequest request) {
        return userService.login(request);
    }

    @GetMapping(value = "/search")
    public ResponseEntity<List<UserResponse>> search(@RequestParam(required = false) String name,
                                                     @RequestParam int size,
                                                     @RequestParam int number) {
        UserFilterRequest request = UserFilterRequest.builder()
                .name(name)
                .size(size)
                .number(number)
                .build();
        return ResponseEntity.ok(userService.filter(request));
    }

    @PostMapping("logout")
    public void logout(@RequestParam String id) {
        userService.logout(id);
    }
}
