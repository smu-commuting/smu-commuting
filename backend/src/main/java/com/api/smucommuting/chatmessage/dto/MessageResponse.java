package com.api.smucommuting.chatmessage.dto;

import com.api.smucommuting.chatmessage.domain.Message;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;


@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class MessageResponse {
    private Long messageId;

    private Long senderId;

    private Integer senderStudentId;

    private String content;

    private Long roomId;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm", timezone = "Asia/Seoul")
    private LocalDateTime createdTime;

    public static MessageResponse build(Message message) {
        return MessageResponse.builder()
                .messageId(message.getId())
                .roomId(message.getChatRoomId())
                .senderId(message.getSenderId())
                .senderStudentId(message.getSenderStudentId())
                .content(message.getContent())
                .createdTime(message.getCreatedAt())
                .build();
    }
}
