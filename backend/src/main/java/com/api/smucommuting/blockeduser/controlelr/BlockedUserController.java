package com.api.smucommuting.blockeduser.controlelr;

import com.api.smucommuting.auth.domain.security.CurrentUser;
import com.api.smucommuting.auth.domain.security.CustomUserDetails;
import com.api.smucommuting.blockeduser.dto.BlockedUserRequest;
import com.api.smucommuting.blockeduser.dto.BlockedUserResponse;
import com.api.smucommuting.blockeduser.service.BlockedUserService;
import com.api.smucommuting.common.dto.ApiResult;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/block")
public class BlockedUserController {
    private final BlockedUserService blockedUserService;

    @PostMapping("/user")
    public ResponseEntity<ApiResult<Void>> block(@RequestBody BlockedUserRequest.Block request, @CurrentUser CustomUserDetails customUserDetails) {
        blockedUserService.block(request, customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }

    @GetMapping("/users")
    public ResponseEntity<ApiResult<List<BlockedUserResponse>>> getList(@CurrentUser CustomUserDetails customUserDetails) {
        List<BlockedUserResponse> response = blockedUserService.getList(customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }

    @DeleteMapping("/user/{userId}")
    public ResponseEntity<ApiResult<Void>> blockCancel(@PathVariable Long userId, @CurrentUser CustomUserDetails customUserDetails) {
        blockedUserService.cancel(userId, customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }
}
