package com.api.smucommuting.auth.service;

import com.api.smucommuting.auth.domain.token.Token;
import com.api.smucommuting.auth.domain.token.TokenProvider;
import com.api.smucommuting.auth.dto.AuthResponse;
import com.api.smucommuting.user.domain.User;
import com.api.smucommuting.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

@Service
@RequiredArgsConstructor
public class RefreshTokenService {
    private final UserRepository userRepository;
    private final TokenProvider tokenProvider;

    //테스트용
    public AuthResponse loginTest(Long userId) {
        User user = userRepository.findById(userId).orElseThrow(EntityNotFoundException::new);
        Token refreshToken = tokenProvider.generateRefreshToken(user);

        return AuthResponse.build(user, tokenProvider.generateAccessToken(user), refreshToken);
    }

    public AuthResponse createAccessTokenAndRefreshToken(String refreshToken) {
        Long userId = tokenProvider.getUserIdFromRefreshToken(refreshToken);
        User user = userRepository.findById(userId).orElseThrow(EntityNotFoundException::new);
        Token createdRefreshToken = tokenProvider.generateRefreshToken(user);

        return AuthResponse.build(user, tokenProvider.generateAccessToken(user), createdRefreshToken);
    }
}
