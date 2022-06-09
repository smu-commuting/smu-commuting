package com.api.smucommuting.post.dto;

import com.api.smucommuting.post.domain.Post;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

public class PostRequest {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class CreateInfo {
        private String content;
        private String item;
        private String place;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime obtainDate;

        public Post toEntity() {
            return Post.builder()
                    .place(place)
                    .item(item)
                    .content(content)
                    .obtainDate(obtainDate)
                    .build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class Update {
        private String content;
        private String item;
        private String place;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime obtainDate;
        private Boolean imageChanged;

        public Post toEntity() {
            return Post.builder()
                    .place(place)
                    .item(item)
                    .content(content)
                    .obtainDate(obtainDate)
                    .build();
        }
    }
}
