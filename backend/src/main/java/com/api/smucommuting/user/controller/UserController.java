package com.api.smucommuting.user.controller;

import com.api.smucommuting.auth.domain.security.CurrentUser;
import com.api.smucommuting.auth.domain.security.CustomUserDetails;
import com.api.smucommuting.user.dto.UserRequest;
import com.api.smucommuting.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    @PostMapping("/signup")
    public void signup(@RequestBody UserRequest.Signup request, @CurrentUser CustomUserDetails customUserDetails) {
        userService.signup(request, customUserDetails.getUser());
    }

    @PostMapping("/email")
    public void sendEmailCode(@CurrentUser CustomUserDetails customUserDetails) {
        userService.sendEmailCode(customUserDetails.getUser());
    }
}
