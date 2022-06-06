package com.api.smucommuting.post.dto;

import com.api.smucommuting.post.domain.Post;
import lombok.*;

public class PostResponse {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class OnlyId {
        private Long postId;

        public static PostResponse.OnlyId build(Post post) {
            return PostResponse.OnlyId.builder().postId(post.getId()).build();
        }
    }
}
