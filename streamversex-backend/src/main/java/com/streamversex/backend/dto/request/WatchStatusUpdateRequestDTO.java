package com.streamversex.backend.dto.request;

import com.streamversex.backend.model.WatchStatus;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class WatchStatusUpdateRequestDTO {

    @NotNull(message = "Watch status is required")
    private WatchStatus status;
}