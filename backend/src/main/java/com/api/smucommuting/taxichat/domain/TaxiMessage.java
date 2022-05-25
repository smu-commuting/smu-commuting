package com.api.smucommuting.taxichat.domain;

import com.api.smucommuting.common.entity.BaseTimeEntity;
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
    private Integer senderStudentId;

    @Column(name = "content")
    private String content;

    @Column(name = "taxi_party_id")
    private Long taxiPartyId;
}
