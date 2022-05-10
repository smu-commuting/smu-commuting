package com.api.smucommuting.auth.dto;

import com.api.smucommuting.auth.domain.token.Token;
import com.api.smucommuting.user.domain.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

@Getter
@Builder(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class AuthResponse {
    private Long userId;
    private String email;
    private String accessToken;
    @JsonIgnore
    private String refreshToken;

    public static AuthResponse build(User user, Token accessToken, Token refreshToken) {
        return AuthResponse.builder()
                .userId(user.getId())
                .email(user.getEmail())
                .accessToken(accessToken.getToken())
                .refreshToken(refreshToken.getToken())
                .build();
    }
}
