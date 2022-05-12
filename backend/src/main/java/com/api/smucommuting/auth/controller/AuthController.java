package com.api.smucommuting.auth.controller;

import com.api.smucommuting.auth.dto.AuthResponse;
import com.api.smucommuting.auth.service.RefreshTokenService;
import com.api.smucommuting.common.dto.ApiResult;
import com.api.smucommuting.common.utils.CookieUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequiredArgsConstructor
@RequestMapping(path = "/api/auth")
public class AuthController {
    private final RefreshTokenService refreshTokenService;
    private static final String REFRESH_TOKEN = "refresh_token";
    private final static Integer MAX_COOKIE_TIME_S = 7 * 24 * 60 * 60;

    //테스트용
    @GetMapping("/{userId}")
    public ResponseEntity<AuthResponse> login(@PathVariable Long userId) {
        AuthResponse authResponse = refreshTokenService.loginTest(userId);
        return ResponseEntity.ok().body(authResponse);
    }

    @PostMapping("/refreshtoken")
    public ResponseEntity<ApiResult<AuthResponse>> refreshToken(@CookieValue(REFRESH_TOKEN) String refreshToken, HttpServletResponse response) {
        AuthResponse tokenResponse = refreshTokenService.createAccessTokenAndRefreshToken(refreshToken);

        CookieUtils.addCookie(response, REFRESH_TOKEN, tokenResponse.getRefreshToken(), MAX_COOKIE_TIME_S);

        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), tokenResponse));
    }
}
