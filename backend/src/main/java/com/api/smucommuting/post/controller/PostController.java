package com.api.smucommuting.post.controller;

import com.api.smucommuting.auth.domain.security.CurrentUser;
import com.api.smucommuting.auth.domain.security.CustomUserDetails;
import com.api.smucommuting.common.dto.ApiResult;
import com.api.smucommuting.post.dto.PostRequest;
import com.api.smucommuting.post.dto.PostResponse;
import com.api.smucommuting.post.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PostController {
    private final PostService postService;

    @PostMapping("/post")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<ApiResult<PostResponse.OnlyId>> create(@RequestPart(value = "info") PostRequest.CreateInfo request,
                                                                 @RequestPart(value = "image") MultipartFile image,
                                                                 @CurrentUser CustomUserDetails customUserDetails) {
        PostResponse.OnlyId response = postService.create(request, image, customUserDetails.getUser());
        return ResponseEntity.created(URI.create("/api/post/" + response.getPostId())).body(ApiResult.build(HttpStatus.CREATED.value(), response));
    }
}
