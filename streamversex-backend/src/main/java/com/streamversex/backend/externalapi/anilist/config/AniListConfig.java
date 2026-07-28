package com.streamversex.backend.externalapi.anilist.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.client.RestClient;

@Configuration
public class AniListConfig {

    @Bean("aniListRestClient")
    public RestClient aniListRestClient() {

        return RestClient.builder()
                .baseUrl("https://graphql.anilist.co")
                .defaultHeader("Content-Type", "application/json")
                .defaultHeader("Accept", "application/json")
                .build();
    }
}