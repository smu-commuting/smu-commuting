package com.api.smucommuting.user.dto;

import com.api.smucommuting.user.domain.ProfileImage;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

public class ProfileImageResponse {
    @Getter
    @Builder
    @NoArgsConstructor(access = AccessLevel.PRIVATE)
    @AllArgsConstructor(access = AccessLevel.PRIVATE)
    public static class GetList {
        private Long imageId;
        private String url;

        public static ProfileImageResponse.GetList build(ProfileImage image) {
            return GetList.builder()
                    .imageId(image.getId())
                    .url(image.getUrl())
                    .build();
        }

        public static List<ProfileImageResponse.GetList> listsOf(List<ProfileImage> posts) {
            return posts.stream().map(ProfileImageResponse.GetList::build).collect(Collectors.toList());
        }
    }
}
