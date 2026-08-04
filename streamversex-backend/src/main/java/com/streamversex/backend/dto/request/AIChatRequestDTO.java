package com.streamversex.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class AIChatRequestDTO {

    @NotBlank
    private String prompt;

}