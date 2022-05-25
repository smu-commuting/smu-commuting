package com.api.smucommuting.blockeduser.dto;

import com.api.smucommuting.user.domain.User;
import lombok.*;

import java.util.List;
import java.util.stream.Collectors;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class BlockedUserResponse {
    private Long userId;
    private Integer studentId;

    public static BlockedUserResponse build(User user) {
        return BlockedUserResponse.builder()
                .userId(user.getId())
                .studentId(user.getStudentId())
                .build();
    }

    public static List<BlockedUserResponse> listsOf(List<User> userList) {
        return userList.stream().map(BlockedUserResponse::build).collect(Collectors.toList());
    }
}
