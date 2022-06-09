package com.api.smucommuting.post.dto;

import com.api.smucommuting.post.domain.PostReply;
import lombok.*;

public class PostReplyResponse {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class OnlyId {
        private Long replyId;

        public static PostReplyResponse.OnlyId build(PostReply reply) {
            return PostReplyResponse.OnlyId.builder().replyId(reply.getId()).build();
        }
    }
}
