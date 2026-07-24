package com.streamversex.backend.security;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.streamversex.backend.model.Role;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CustomUserDetails implements UserDetails {

		private final String id;
		 private final String email;
		    private final String password;
		    private final Role role;
		    private final boolean blocked;
		    private final boolean emailVerified;
			@Override
			public Collection<? extends GrantedAuthority> getAuthorities() {
				return List.of(
						new SimpleGrantedAuthority("ROLE_"+role.name())
						);
			}
			@Override
			public String getUsername() {
				return email;
			}
			
			@Override
		    public boolean isAccountNonExpired() {
		        return true;
		    }

		    @Override
		    public boolean isAccountNonLocked() {
		        return !blocked;
		    }

		    @Override
		    public boolean isCredentialsNonExpired() {
		        return true;
		    }

		    @Override
		    public boolean isEnabled() {
		        return emailVerified;
		    }

}
