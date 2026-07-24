package com.streamversex.backend.util;


import java.security.Key;
import java.util.Date;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.streamversex.backend.model.User;
import com.streamversex.backend.security.CustomUserDetails;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtUtil {
	
	@Value("${jwt.secret}")
	private String secretKey;
	
	@Value("${jwt.expiration-ms}")
	private long expirationMs;
	
	private Key getSigningKey() {
		byte[] keyBytes=Decoders.BASE64.decode(secretKey);
		return Keys.hmacShaKeyFor(keyBytes);
		
	}
	
	public String generateToken(User user) {
		Date now=new Date();
		Date expiry = new Date(now.getTime()+expirationMs);
		
		return Jwts.builder()
				.setSubject(user.getId())
				.claim("email",user.getEmail())
				.claim("role", user.getRole().name())
				.setIssuedAt(now)
				.setExpiration(expiry)
				.signWith(getSigningKey(),SignatureAlgorithm.HS256)
				.compact();
	}
	
	public String extractUserId(String token) {
		return extractClaim(token,Claims::getSubject);
	}
	
	public String extractRole(String token) {
		return extractClaim(token, claims-> claims.get("role",String.class));
		
	}
	
	public boolean isTokenValid(String token, UserDetails userDetails) {
	    try {

	        String userId = extractUserId(token);

	        CustomUserDetails customUser = (CustomUserDetails) userDetails;

	        Date expiration = extractClaim(token, Claims::getExpiration);

	        return userId.equals(customUser.getId())
	                && expiration.after(new Date());

	    } catch (Exception e) {
	        return false;
	    }
	}
	
	  private <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
	        Claims claims = extractAllClaims(token);
	        return claimsResolver.apply(claims);
	    }
	
	
	  private Claims extractAllClaims(String token) {
		    return Jwts.parser()
		            .verifyWith((javax.crypto.SecretKey) getSigningKey())
		            .build()
		            .parseSignedClaims(token)
		            .getPayload();
		}

}
