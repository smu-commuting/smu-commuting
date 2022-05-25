package com.api.smucommuting.blockeduser.domain;

import com.api.smucommuting.common.entity.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "blocked_user")
public class BlockedUser extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "blocked_user_id")
    private Long blockedUserId;

    public static BlockedUser create(Long loginUserId, Long blockedUserId) {
        return BlockedUser.builder()
                .userId(loginUserId)
                .blockedUserId(blockedUserId)
                .build();
    }
}
