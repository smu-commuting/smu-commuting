package com.api.smucommuting.user.controller;

import com.api.smucommuting.auth.domain.security.CurrentUser;
import com.api.smucommuting.auth.domain.security.CustomUserDetails;
import com.api.smucommuting.common.dto.ApiResult;
import com.api.smucommuting.user.dto.UserRequest;
import com.api.smucommuting.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<ApiResult<Void>> signup(@RequestBody UserRequest.Signup request, @CurrentUser CustomUserDetails customUserDetails) {
        userService.signup(request, customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }

    @PostMapping("/email")
    public ResponseEntity<ApiResult<Void>> sendEmailCode(@CurrentUser CustomUserDetails customUserDetails) {
        userService.sendEmailCode(customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }

    @PostMapping("/email/verification")
    public ResponseEntity<ApiResult<Void>> codeVerification(@RequestBody UserRequest.EmailVerification request, @CurrentUser CustomUserDetails customUserDetails) {
        userService.codeVerification(request, customUserDetails.getUser(), LocalDateTime.now());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }
}
