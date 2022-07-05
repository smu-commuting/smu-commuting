package com.api.smucommuting.post.dto;

import com.api.smucommuting.post.domain.PostReply;
import com.api.smucommuting.user.domain.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

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

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class GetList {
        private Long replyId;
        private String content;
        private Boolean isMine;
        private PostDto.Writer writer;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime createdDate;

        public static PostReplyResponse.GetList build(PostReply reply, User loginUser) {
            return GetList.builder()
                    .replyId(reply.getId())
                    .content(reply.getContent())
                    .writer(PostDto.Writer.build(reply.getWriter()))
                    .isMine(reply.isMine(loginUser))
                    .createdDate(reply.getCreatedAt())
                    .build();
        }

        public static List<PostReplyResponse.GetList> listsOf(List<PostReply> replies, User loginUser) {
            return replies.stream().map(reply -> PostReplyResponse.GetList.build(reply, loginUser)).collect(Collectors.toList());
        }
    }
}
