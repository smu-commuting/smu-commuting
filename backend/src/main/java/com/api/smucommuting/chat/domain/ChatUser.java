package com.api.smucommuting.chat.domain;

import com.api.smucommuting.common.entity.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "chat_user")
public class ChatUser extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chat_user_id")
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "chat_room_id")
    private ChatRoom chatRoom;

    private void assignChatRoom(ChatRoom chatRoom) {
        this.chatRoom = chatRoom;
        chatRoom.getUsers().add(this);
    }

    public static ChatUser create(Long userId, ChatRoom chatRoom) {
        ChatUser chatUser = ChatUser.builder()
                .userId(userId)
                .build();
        chatUser.assignChatRoom(chatRoom);
        return chatUser;
    }
}
