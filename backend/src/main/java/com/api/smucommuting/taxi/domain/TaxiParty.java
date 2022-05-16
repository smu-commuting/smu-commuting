package com.api.smucommuting.taxi.domain;

import com.api.smucommuting.common.entity.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "taxi_party")
public class TaxiParty extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "taxi_place_id")
    private TaxiPlace taxiPlace;

    @Column(name = "headcount")
    private int headcount;

    @Column(name = "meeting_time")
    private LocalDateTime meetingTime;

    @Builder.Default
    @OneToMany(mappedBy = "taxiParty",cascade = CascadeType.ALL)
    private List<TaxiGroup> taxiGroupList = new ArrayList<>();
}
