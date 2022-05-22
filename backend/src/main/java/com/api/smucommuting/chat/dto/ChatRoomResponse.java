package com.api.smucommuting.chat.dto;

import com.api.smucommuting.chat.domain.ChatRoom;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;

public class ChatRoomResponse {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class GetList {
        private Long chatRoomId;
        private String place;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-dd", timezone = "Asia/Seoul")
        private LocalDateTime date;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime time;
        private int headcount;
        private int maximum;

        public static ChatRoomResponse.GetList build(ChatRoom chatRoom) {
            return GetList.builder()
                    .chatRoomId(chatRoom.getId())
                    .place(chatRoom.getPlace())
                    .headcount(chatRoom.getUsers().size())
                    .maximum(chatRoom.getMaximum())
                    .date(chatRoom.getMeetingTime())
                    .time(chatRoom.getMeetingTime())
                    .build();
        }
    }
}
