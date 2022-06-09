package com.api.smucommuting.post.controller;

import com.api.smucommuting.auth.domain.security.CurrentUser;
import com.api.smucommuting.auth.domain.security.CustomUserDetails;
import com.api.smucommuting.common.dto.ApiResult;
import com.api.smucommuting.post.dto.PostReplyRequest;
import com.api.smucommuting.post.dto.PostReplyResponse;
import com.api.smucommuting.post.service.PostReplyService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PostReplyController {
    private final PostReplyService postReplyService;

    @PostMapping("/post/{postId}/reply")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<ApiResult<PostReplyResponse.OnlyId>> create(@PathVariable Long postId,
                                                                      @RequestBody PostReplyRequest.Create request,
                                                                      @CurrentUser CustomUserDetails customUserDetails) {
        PostReplyResponse.OnlyId response = postReplyService.create(postId, request, customUserDetails.getUser());
        return ResponseEntity.created(URI.create("/api/post/reply/" + response.getReplyId())).body(ApiResult.build(HttpStatus.CREATED.value(), response));
    }
}
