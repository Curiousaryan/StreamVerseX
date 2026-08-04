package com.streamversex.backend.ai.dto;

import java.util.List;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GeminiRequest {

    private List<Content> contents;

}