package com.api.smucommuting.chat.dto;

import com.api.smucommuting.taxi.domain.TaxiParty;
import com.api.smucommuting.taxi.dto.TaxiPartyResponse;
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

        public static TaxiPartyResponse.GetList build(TaxiParty taxiParty) {
            return TaxiPartyResponse.GetList.builder()
                    .taxiPartyId(taxiParty.getId())
                    .headcount(taxiParty.getTaxiGroupList().size())
                    .maximum(taxiParty.getMaximum())
                    .time(taxiParty.getMeetingTime())
                    .build();
        }
    }
}
