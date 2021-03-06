package com.api.smucommuting.post.dto;

import com.api.smucommuting.post.domain.Post;
import com.api.smucommuting.user.domain.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

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

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class GetOne {
        private String item;
        private String place;
        private String content;
        private String image;
        private Boolean isMine;
        private String writer;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime createdDate;

        public static PostResponse.GetOne build(Post post, User loginUser) {
            return GetOne.builder()
                    .item(post.getItem())
                    .place(post.getPlace())
                    .content(post.getContent())
                    .image(post.getPostFile().getUrl())
                    .createdDate(post.getCreatedAt())
                    .isMine(post.isMine(loginUser))
                    .writer(post.getWriter().getStudentId().toString())
                    .build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class GetList {
        private Long postId;
        private String item;
        private String place;
        private String image;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime createdDate;

        public static PostResponse.GetList build(Post post) {
            return GetList.builder()
                    .postId(post.getId())
                    .item(post.getItem())
                    .place(post.getPlace())
                    .image(post.getPostFile().getUrl())
                    .createdDate(post.getCreatedAt())
                    .build();
        }

        public static List<GetList> listsOf(List<Post> posts) {
            return posts.stream().map(GetList::build).collect(Collectors.toList());
        }
    }
}
