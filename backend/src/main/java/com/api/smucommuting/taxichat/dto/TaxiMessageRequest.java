package com.api.smucommuting.taxichat.dto;

import com.api.smucommuting.taxichat.domain.TaxiMessage;
import lombok.Getter;

@Getter
public class TaxiMessageRequest {
    public enum MessageType {
        ENTER, TALK
    }

    private MessageType messageType;
    private String message;
    private Long roomId;
    private Long senderId;
    private int studentId;

    public TaxiMessage toEntity() {
        if (this.getMessageType().equals(TaxiMessageRequest.MessageType.ENTER)) {
            this.message = this.studentId + "님이 입장하셨습니다.";
        }
        return TaxiMessage.builder()
                .taxiPartyId(roomId)
                .senderId(senderId)
                .senderStudentId(studentId)
                .content(message)
                .build();
    }
}
