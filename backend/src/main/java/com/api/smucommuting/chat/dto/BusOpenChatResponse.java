package com.api.smucommuting.chat.dto;

import com.api.smucommuting.chat.domain.BusOpenChatMessage;
import com.api.smucommuting.chat.domain.TaxiMessage;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class BusOpenChatResponse {
    private Long messageId;
    private Long senderId;
    private String senderStudentId;
    private String content;
    private Long roomId;
    private LocalDateTime createdTime;

    public static BusOpenChatResponse build(BusOpenChatMessage busOpenChatMessage) {
        return BusOpenChatResponse.builder()
                .messageId(busOpenChatMessage.getId())
                .roomId(busOpenChatMessage.getBusOpenChatId())
                .senderId(busOpenChatMessage.getSenderId())
                .senderStudentId(busOpenChatMessage.getSenderStudentId())
                .content(busOpenChatMessage.getContent())
                .createdTime(busOpenChatMessage.getCreatedAt())
                .build();
    }

    public static List<BusOpenChatResponse> listOf(List<BusOpenChatMessage> taxiMessages) {
        return taxiMessages.stream().map(BusOpenChatResponse::build).collect(Collectors.toList());
    }
}

