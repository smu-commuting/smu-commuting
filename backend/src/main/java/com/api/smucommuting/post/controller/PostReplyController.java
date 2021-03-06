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
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class PostReplyController {
    private final PostReplyService postReplyService;

    @PostMapping("/post/{postId}/reply")
    @ResponseStatus(HttpStatus.CREATED)
    public ResponseEntity<ApiResult<PostReplyResponse.OnlyId>> create(@PathVariable Long postId,
                                                                      @RequestBody PostReplyRequest.CreateOrUpdate request,
                                                                      @CurrentUser CustomUserDetails customUserDetails) {
        PostReplyResponse.OnlyId response = postReplyService.create(postId, request, customUserDetails.getUser());
        return ResponseEntity.created(URI.create("/api/post/reply/" + response.getReplyId())).body(ApiResult.build(HttpStatus.CREATED.value(), response));
    }

    @GetMapping("/post/{postId}/replies")
    public ResponseEntity<ApiResult<List<PostReplyResponse.GetList>>> getList(@PathVariable Long postId,
                                                                              @CurrentUser CustomUserDetails customUserDetails) {
        List<PostReplyResponse.GetList> response = postReplyService.getList(postId, customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }

    @PutMapping("/post/reply/{replyId}")
    public ResponseEntity<ApiResult<Void>> update(@PathVariable Long replyId,
                                                  @RequestBody PostReplyRequest.CreateOrUpdate request,
                                                  @CurrentUser CustomUserDetails customUserDetails) {
        postReplyService.update(replyId, request, customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }

    @DeleteMapping("/post/reply/{replyId}")
    public ResponseEntity<ApiResult<Void>> deleteOne(@PathVariable Long replyId,
                                                     @CurrentUser CustomUserDetails customUserDetails) {
        postReplyService.delete(replyId, customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }
}
