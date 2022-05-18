package com.api.smucommuting.taxi.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.querydsl.core.annotations.QueryProjection;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


public class TaxiPartyResponse {
    @Getter
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    public static class GetList {
        private Long taxiPartyId;
        private int headcount;
        private int maximum;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime time;

        @Builder
        @QueryProjection
        public GetList(Long taxiPartyId, int headcount, int maximum, LocalDateTime time) {
            this.taxiPartyId = taxiPartyId;
            this.headcount = headcount;
            this.maximum = maximum;
            this.time = time;
        }
    }
}
