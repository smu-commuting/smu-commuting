package com.api.smucommuting.chat.dto;

import com.api.smucommuting.chat.domain.BusOpenChatMessage;
import lombok.Getter;

@Getter
public class BusOpenChatRequest {
    private String message;
    private Long roomId;
    private Long senderId;
    private String studentId;

    public BusOpenChatMessage toEntity() {
        return BusOpenChatMessage.builder()
                .busOpenChatId(roomId)
                .senderId(senderId)
                .senderStudentId(studentId)
                .content(message)
                .build();
    }
}

