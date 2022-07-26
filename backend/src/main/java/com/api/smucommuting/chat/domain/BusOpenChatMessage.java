package com.api.smucommuting.chat.domain;

import com.api.smucommuting.common.entity.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "bus_open_chat_message")
public class BusOpenChatMessage extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "sender_id")
    private Long senderId;

    @Column(name = "sender_student_id")
    private Integer senderStudentId;

    @Column(name = "content")
    private String content;

    @Column(name = "bus_open_chat_id")
    private Long busOpenChatId;

}
