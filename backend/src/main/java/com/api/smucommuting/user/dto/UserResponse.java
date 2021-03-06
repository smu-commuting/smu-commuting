package com.api.smucommuting.user.dto;

import com.api.smucommuting.user.domain.User;
import lombok.*;

public class UserResponse {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Signup {
        private Long userId;
        private String email;
        private Integer studentId;

        public static UserResponse.Signup build(User user) {
            return Signup.builder()
                    .userId(user.getId())
                    .studentId(user.getStudentId())
                    .email(user.getEmail())
                    .build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class GetOne {
        private Long userId;
        private Integer studentId;
        private String imageUrl;

        public static UserResponse.GetOne build(User user) {
            return GetOne.builder()
                    .userId(user.getId())
                    .studentId(user.getStudentId())
                    .imageUrl(user.getProfileImage().getUrl())
                    .build();
        }

    }
}
