package com.api.smucommuting.taxi.dto;

import com.api.smucommuting.taxi.domain.TaxiParty;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;


public class TaxiPartyResponse {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class GetList {
        private Long taxiPartyId;
        private int headcount;
        private int maximum;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime time;

        public static TaxiPartyResponse.GetList build(TaxiParty taxiParty) {
            return GetList.builder()
                    .taxiPartyId(taxiParty.getId())
                    .headcount(taxiParty.getTaxiGroupList().size())
                    .maximum(taxiParty.getMaximum())
                    .time(taxiParty.getMeetingTime())
                    .build();
        }
    }

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class GetMyList {
        private Long chatRoomId;
        private String place;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-dd", timezone = "Asia/Seoul")
        private LocalDateTime date;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime time;
        private int headcount;
        private int maximum;

        public static TaxiPartyResponse.GetMyList build(TaxiParty taxiParty) {
            return TaxiPartyResponse.GetMyList.builder()
                    .chatRoomId(taxiParty.getId())
                    .place(taxiParty.getTaxiPlace().getName())
                    .headcount(taxiParty.getTaxiGroupList().size())
                    .maximum(taxiParty.getMaximum())
                    .date(taxiParty.getMeetingTime())
                    .time(taxiParty.getMeetingTime())
                    .build();
        }
    }
}
