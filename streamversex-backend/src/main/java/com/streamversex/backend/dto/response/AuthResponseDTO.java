package com.streamversex.backend.dto.response;

import com.streamversex.backend.model.Role;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AuthResponseDTO {
	
	private String token;

    @Builder.Default
    private String tokenType = "Bearer";
	private String userId;
	private String name;
	private String email;
	private Role role;
	

}
