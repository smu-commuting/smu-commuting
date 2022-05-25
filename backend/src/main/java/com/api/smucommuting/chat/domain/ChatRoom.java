package com.api.smucommuting.chat.domain;

import com.api.smucommuting.common.entity.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "chat_room")
public class ChatRoom extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_room_id")
    private Long id;

    @Column(name = "taxi_party_id")
    private Long taxiPartyId;

    @Column(name = "place")
    private String place;

    @Column(name = "maximum")
    private int maximum;

    @Column(name = "meeting_time")
    private LocalDateTime meetingTime;

    @Builder.Default
    @OneToMany(mappedBy = "chatRoom", cascade = CascadeType.ALL)
    private Set<ChatUser> users = new HashSet<>();

    public static ChatRoom create(String place, int maximum, LocalDateTime meetingTime, Long taxiPartyId, Long userId) {
        ChatRoom chatRoom = ChatRoom.builder()
                .taxiPartyId(taxiPartyId)
                .place(place)
                .maximum(maximum)
                .meetingTime(meetingTime)
                .build();
        ChatUser.create(userId, chatRoom);
        return chatRoom;
    }
}
