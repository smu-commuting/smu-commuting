package com.api.smucommuting.taxi.domain;

import com.api.smucommuting.common.entity.BaseTimeEntity;
import com.api.smucommuting.user.domain.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Builder(access = AccessLevel.PRIVATE)
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

    @Column(name = "maximum")
    private int maximum;

    @Column(name = "meeting_time")
    private LocalDateTime meetingTime;

    @Builder.Default
    @OneToMany(mappedBy = "taxiParty", cascade = CascadeType.ALL)
    private List<TaxiGroup> taxiGroupList = new ArrayList<>();

    public static TaxiParty create(TaxiPlace taxiPlace, int maximum, LocalDateTime meetingTime, Long userId, TaxiPartyValidator taxiPartyValidator) {
        taxiPartyValidator.createValidate(userId, meetingTime);
        TaxiParty taxiParty = TaxiParty.builder()
                .taxiPlace(taxiPlace)
                .maximum(maximum)
                .meetingTime(meetingTime)
                .build();
        TaxiGroup.createWithOutValidate(userId, taxiParty);
        return taxiParty;
    }

    public void update(int maximum, User loginUser, TaxiPartyValidator taxiPartyValidator, TaxiParty taxiParty) {
        taxiPartyValidator.updateValidate(loginUser, maximum, taxiParty);
        this.maximum = maximum;
    }
}
