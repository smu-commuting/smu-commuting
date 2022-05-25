package com.api.smucommuting.chatmessage.dto;

import com.api.smucommuting.chatmessage.domain.Message;
import lombok.Getter;

@Getter
public class MessageRequest {
    public enum MessageType {
        ENTER, TALK
    }

    private MessageType messageType;
    private String message;
    private Long roomId;
    private Long senderId;
    private int studentId;

    public Message toEntity() {
        if (this.getMessageType().equals(MessageRequest.MessageType.ENTER)) {
            this.message = this.studentId + "님이 입장하셨습니다.";
        }
        return Message.builder()
                .chatRoomId(roomId)
                .senderId(senderId)
                .senderStudentId(studentId)
                .content(message)
                .build();
    }
}
