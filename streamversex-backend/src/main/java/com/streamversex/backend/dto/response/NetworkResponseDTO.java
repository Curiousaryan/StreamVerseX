package com.streamversex.backend.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class NetworkResponseDTO {

    private Long id;

    private String name;

    private String logoUrl;

    private String originCountry;
}