package com.api.smucommuting.user.controller;

import com.api.smucommuting.common.dto.ApiResult;
import com.api.smucommuting.common.dto.PageDto;
import com.api.smucommuting.user.dto.ProfileImageResponse;
import com.api.smucommuting.user.service.ProfileImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/profiles")
public class ProfileImageController {
    private final ProfileImageService profileImageService;

    @GetMapping
    public ResponseEntity<ApiResult<List<ProfileImageResponse.GetList>>> getList() {
        List<ProfileImageResponse.GetList> response = profileImageService.getList();
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }
}
