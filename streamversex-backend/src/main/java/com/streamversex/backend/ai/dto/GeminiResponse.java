package com.streamversex.backend.ai.dto;

import java.util.List;

import lombok.Data;

@Data
public class GeminiResponse {

    private List<Candidate> candidates;

    @Data
    public static class Candidate {

        private Content content;

    }

}