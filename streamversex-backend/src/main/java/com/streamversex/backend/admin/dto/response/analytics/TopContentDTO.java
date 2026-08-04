package com.streamversex.backend.admin.dto.response.analytics;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TopContentDTO {

    private Long contentId;

    private long total;

}