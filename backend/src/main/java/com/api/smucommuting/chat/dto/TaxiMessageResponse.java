package com.api.smucommuting.chat.dto;

import com.api.smucommuting.chat.domain.TaxiMessage;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class TaxiMessageResponse {
    private Long messageId;
    private Long senderId;
    private String senderStudentId;
    private String content;
    private Long roomId;
    private LocalDateTime createdTime;

    public static TaxiMessageResponse build(TaxiMessage taxiMessage) {
        return TaxiMessageResponse.builder()
                .messageId(taxiMessage.getId())
                .roomId(taxiMessage.getTaxiPartyId())
                .senderId(taxiMessage.getSenderId())
                .senderStudentId(taxiMessage.getSenderStudentId())
                .content(taxiMessage.getContent())
                .createdTime(taxiMessage.getCreatedAt())
                .build();
    }

    public static List<TaxiMessageResponse> listOf(List<TaxiMessage> taxiMessages) {
        return taxiMessages.stream().map(TaxiMessageResponse::build).collect(Collectors.toList());
    }
}
