package com.api.smucommuting.taxi.dto;

import com.api.smucommuting.user.domain.User;
import lombok.*;

public class TaxiPartyDto {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class PartyUser {
        private Long userId;
        private String profileUrl;

        public static TaxiPartyDto.PartyUser build(User user) {
            PartyUserBuilder builder = PartyUser.builder()
                    .userId(user.getId());
            if (user.getProfileImage() != null) {
                builder.profileUrl(user.getProfileImage().getUrl());
            }
            return builder.build();
        }
    }
}
