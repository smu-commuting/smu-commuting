package com.api.smucommuting.post.dto;

import com.api.smucommuting.post.domain.PostReply;
import lombok.*;

public class PostReplyRequest {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Create {
        private String content;

        public PostReply toEntity() {
            return PostReply.builder()
                    .content(content)
                    .build();
        }
    }
}
