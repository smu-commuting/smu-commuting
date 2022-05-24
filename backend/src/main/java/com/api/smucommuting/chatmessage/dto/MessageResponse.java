package com.api.smucommuting.chatmessage.dto;

import com.api.smucommuting.chatmessage.domain.Message;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


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

    public static List<MessageResponse> listOf(List<Message> messages) {
        return messages.stream().map(MessageResponse::build).collect(Collectors.toList());
    }
}
