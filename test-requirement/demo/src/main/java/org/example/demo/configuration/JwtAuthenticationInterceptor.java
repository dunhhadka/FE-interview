package org.example.demo.configuration;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.example.demo.application.service.JwtService;
import org.example.demo.application.service.UserService;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import java.util.Arrays;
import java.util.List;


@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationInterceptor implements HandlerInterceptor {

    private final JwtService jwtService;
    private final UserService userService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        if ("OPTIONS".equalsIgnoreCase(request.getMethod())) {
            response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
            response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
            response.setHeader("Access-Control-Allow-Headers", "Authorization, Content-Type");
            response.setStatus(HttpServletResponse.SC_OK); // Phản hồi OK
            return false; // Không cần tiếp tục xử lý yêu cầu này
        }

        String uri = request.getRequestURI();
        if (allowRequestMatchers.contains(uri)) {
            return true;
        }

        String authorizationHeader = request.getHeader("Authorization");

        log.info("Authorization Header: {}", authorizationHeader);

        String token = null;

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            token = authorizationHeader.substring(7);
        }

        log.info("Extracted Token: {}", token);

        if (StringUtils.isBlank(token)) {
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Token is missing or invalid");
            return false;
        }

        try {
            String userId = JwtService.parseToken(token);
            userService.authenticate(userId, token);
        } catch (Exception e) {
            log.error(e.getMessage());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid token");
            return false;
        }

        return true;
    }

    public static final List<String> allowRequestMatchers = Arrays.asList(
            "/admin/users/login",
            "/admin/users/register"
    );
}
