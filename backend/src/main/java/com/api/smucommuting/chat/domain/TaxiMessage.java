package com.api.smucommuting.chat.domain;

import com.api.smucommuting.common.entity.BaseTimeEntity;
import com.api.smucommuting.common.event.Events;
import com.api.smucommuting.chat.domain.event.MessageSendEvent;
import lombok.*;

import javax.persistence.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "taxi_message")
public class TaxiMessage extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "taxi_message_id")
    private Long id;

    @Column(name = "sender_id")
    private Long senderId;

    @Column(name = "sender_student_id")
    private String senderStudentId;

    @Column(name = "content")
    private String content;

    @Column(name = "taxi_party_id")
    private Long taxiPartyId;

    public void send() {
        Events.raise(new MessageSendEvent(this.taxiPartyId, this.senderId.toString(), this.content));
    }
}
