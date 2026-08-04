package com.streamversex.backend.ai;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;

import com.streamversex.backend.ai.dto.Content;
import com.streamversex.backend.ai.dto.GeminiRequest;
import com.streamversex.backend.ai.dto.GeminiResponse;
import com.streamversex.backend.ai.dto.Part;
import com.streamversex.backend.exception.AIException;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class GeminiClient {

    private final RestClient restClient;

    @Value("${gemini.api-key}")
    private String apiKey;

    @Value("${gemini.base-url}")
    private String baseUrl;

    public String generateContent(String prompt) {

        GeminiRequest request = GeminiRequest.builder()
                .contents(
                        List.of(
                                new Content(
                                        List.of(
                                                new Part(prompt)
                                        )
                                )
                        )
                )
                .build();

        GeminiResponse response =
                restClient.post()
                .uri(
                	    baseUrl
                	    + "/v1beta/models/gemini-flash-latest:generateContent?key="
                	    + apiKey
                	)
                        .contentType(MediaType.APPLICATION_JSON)
                        .body(request)
                        .retrieve()
                        .body(GeminiResponse.class);

        if (response == null
                || response.getCandidates() == null
                || response.getCandidates().isEmpty()) {

            throw new AIException(
                    "No response received from Gemini."
            );
        }

        return response
                .getCandidates()
                .get(0)
                .getContent()
                .getParts()
                .get(0)
                .getText();
    }
}