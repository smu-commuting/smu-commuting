package com.api.smucommuting.post.dto;

import com.api.smucommuting.user.domain.User;
import lombok.*;

public class PostDto {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Writer {
        private String studentId;
        private String profileImageUrl;

        public static PostDto.Writer build(User user) {
            return Writer.builder().studentId(user.getStudentId()).profileImageUrl(user.getProfileImage().getUrl()).build();
        }
    }
}
