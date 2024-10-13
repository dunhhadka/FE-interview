package org.example.demo.application.service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;
import lombok.RequiredArgsConstructor;
import org.example.demo.model.User;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
@RequiredArgsConstructor
public class JwtService {
    // Sử dụng biến instance thay vì static để có thể dễ dàng thay đổi SecretKey trong tương lai
    private static final SecretKey secretKey = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    // Thay đổi phương thức để sử dụng secretKey instance
    public static String generateToken(User user) {
        long nowMillis = System.currentTimeMillis();
        Date now = new Date(nowMillis);
        long expirationMillis = nowMillis + 3600000; // 1 hour expiration
        Date expiration = new Date(expirationMillis);

        return Jwts.builder()
                .setSubject(user.getId())
                .setIssuedAt(now)
                .setExpiration(expiration)
                .signWith(secretKey) // Sử dụng secretKey instance
                .compact();
    }

    // Để phương thức không phải static nếu không cần thiết
    public static String parseToken(String token) {
        Claims claims = parseClaims(token);
        return claims.getSubject();
    }

    // Để phương thức không phải static nếu không cần thiết
    public static Claims parseClaims(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(secretKey) // Sử dụng secretKey instance
                    .parseClaimsJws(token)
                    .getBody();
        } catch (SignatureException e) {
            throw new RuntimeException("Invalid JWT signature: " + e.getMessage(), e);
        } catch (Exception e) {
            throw new RuntimeException("Invalid token: " + e.getMessage(), e);
        }
    }
}
