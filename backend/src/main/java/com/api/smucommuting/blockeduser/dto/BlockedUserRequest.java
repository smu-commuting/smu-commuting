package com.api.smucommuting.blockeduser.dto;

import lombok.*;

public class BlockedUserRequest {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Block {
        private Long blockUserId;
    }

}
