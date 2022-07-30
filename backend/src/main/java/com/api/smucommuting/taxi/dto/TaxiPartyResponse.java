package com.api.smucommuting.taxi.dto;

import com.api.smucommuting.taxi.domain.TaxiParty;
import com.api.smucommuting.user.domain.User;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


public class TaxiPartyResponse {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class GetOne {
        private Long taxiPartyId;
        private int headcount;
        private String place;
        private int maximum;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM-dd", timezone = "Asia/Seoul")
        private LocalDateTime date;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm", timezone = "Asia/Seoul")
        private LocalDateTime time;
        private Boolean hasBlockedUser;

        public static TaxiPartyResponse.GetOne build(TaxiParty taxiParty, List<Long> partyUserIdList, List<Long> blockedUserIdList) {
            return GetOne.builder()
                    .taxiPartyId(taxiParty.getId())
                    .headcount(taxiParty.getTaxiGroupList().size())
                    .maximum(taxiParty.getMaximum())
                    .date(taxiParty.getMeetingTime())
                    .time(taxiParty.getMeetingTime())
                    .place(taxiParty.getTaxiPlace().getName())
                    .hasBlockedUser(partyUserIdList.stream().anyMatch(blockedUserIdList::contains))
                    .build();
        }
    }

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

    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class TaxiPartyUsers {
        private Long userId;
        private Integer studentId;
        private Boolean isBlocked;

        public static TaxiPartyUsers build(User user, List<Long> blockedUserIdList) {
            return TaxiPartyUsers.builder()
                    .userId(user.getId())
                    .studentId(user.getStudentId())
                    .isBlocked(blockedUserIdList.contains(user.getId()))
                    .build();
        }

        public static List<TaxiPartyUsers> listsOf(List<User> userList, List<Long> blockedUserIdList) {
            return userList.stream().map(user -> TaxiPartyUsers.build(user, blockedUserIdList)).collect(Collectors.toList());
        }
    }
}
