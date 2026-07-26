package com.streamversex.backend.externalapi.tmdb.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.client.RestClient;

@Configuration
public class TmdbConfig {

    @Value("${tmdb.base-url}")
    private String baseUrl;

    @Value("${tmdb.access-token}")
    private String accessToken;

    @Bean
    public RestClient tmdbRestClient() {

        return RestClient.builder()
                .baseUrl(baseUrl)
                .defaultHeader(
                        HttpHeaders.AUTHORIZATION,
                        "Bearer " + accessToken
                )
                .defaultHeader(
                        HttpHeaders.ACCEPT,
                        "application/json"
                )
                .build();
    }
}