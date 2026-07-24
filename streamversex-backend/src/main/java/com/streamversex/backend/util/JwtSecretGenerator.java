package com.streamversex.backend.util;

import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Encoders;
import io.jsonwebtoken.security.Keys;

public class JwtSecretGenerator {

    public static void main(String[] args) {

        String secret = Encoders.BASE64.encode(
                Keys.secretKeyFor(SignatureAlgorithm.HS256).getEncoded()
        );

        System.out.println("JWT Secret:");
        System.out.println(secret);
    }
}
