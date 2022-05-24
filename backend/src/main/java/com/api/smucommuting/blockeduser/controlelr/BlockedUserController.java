package com.api.smucommuting.blockeduser.controlelr;

import com.api.smucommuting.auth.domain.security.CurrentUser;
import com.api.smucommuting.auth.domain.security.CustomUserDetails;
import com.api.smucommuting.blockeduser.dto.BlockedUserRequest;
import com.api.smucommuting.blockeduser.service.BlockedUserService;
import com.api.smucommuting.common.dto.ApiResult;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/block/user")
public class BlockedUserController {
    private final BlockedUserService blockedUserService;

    @PostMapping
    public ResponseEntity<ApiResult<Void>> block(@RequestBody BlockedUserRequest.Block request, @CurrentUser CustomUserDetails customUserDetails) {
        blockedUserService.block(request, customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }
}
