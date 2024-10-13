package org.example.demo.application.service;

import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.BooleanUtils;
import org.apache.commons.lang3.StringUtils;
import org.example.demo.application.exception.ConstrainViolationException;
import org.example.demo.application.model.*;
import org.example.demo.model.User;
import org.example.demo.persistence.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserFilterService filterService;

    public void authenticate(String userId, String token) {
        if (StringUtils.isBlank(userId)) {
            throw new IllegalArgumentException("authentication failed");
        }
        var user = userRepository.findById(userId)
                .orElseThrow(IllegalArgumentException::new);
        if (BooleanUtils.isFalse(user.isLogin())) {
            throw new IllegalArgumentException();
        }
        var tokenSessions = user.getTokenSessions();
        if (tokenSessions == null || !tokenSessions.contains(token)) {
            throw new IllegalArgumentException();
        }
    }

    public UserResponse create(UserRequest request) {

        validateUserRequest(request);

        var user = new User();
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setAge(request.getAge());
        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        var userSaved = userRepository.save(user);

        return toResponse(userSaved);
    }

    private void validateUserRequest(UserRequest request) {
        var users = userRepository.findByEmail(request.getEmail());
        if (!CollectionUtils.isEmpty(users)) {
            throw new IllegalArgumentException("Email already existed"); // TODO: custom exception
        }
    }

    private UserResponse toResponse(User user) {
        return UserResponse.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .age(user.getAge())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .password(user.getPassword())
                .id(user.getId())
                .build();
    }

    public LoginResponse login(LoginRequest request) {
        var user = userRepository.findByEmailAndPassword(request.getEmail(), request.getPassword());
        if (user == null) {
            throw new ConstrainViolationException(401, "Email or password invalid");
        }
        user.setLogin(true);
        //clear all token then add new token
        var token = JwtService.generateToken(user);
        user.setTokenSessions(List.of(token));
        userRepository.save(user);

        var userResponse = toResponse(user);

        return LoginResponse.builder()
                .user(userResponse)
                .token(token)
                .build();
    }

    public List<UserResponse> filter(UserFilterRequest request) {
        var users = filterService.filter(request);
        return users.stream()
                .map(this::toResponse)
                .toList();
    }

    public void logout(String id) {
        var user = userRepository.findById(id)
                .orElseThrow(() -> new ConstrainViolationException(404, "not found"));
        user.setTokenSessions(List.of());
        userRepository.save(user);
    }
}
