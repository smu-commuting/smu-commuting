package com.api.smucommuting.chatmessage.domain;

import com.api.smucommuting.common.entity.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "message")
public class Message extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id")
    private Long id;

    @Column(name = "sender_id")
    private Long senderId;

    @Column(name = "sender_student_id")
    private Integer senderStudentId;

    @Column(name = "content")
    private String content;

    @Column(name = "chat_room_id")
    private Long chatRoomId;
}
