package com.api.smucommuting.taxi.domain;

import com.api.smucommuting.common.entity.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;

@Getter
@Builder(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "taxi_group")
public class TaxiGroup extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "taxi_party_id")
    private TaxiParty taxiParty;

    private void assignTaxiParty(TaxiParty taxiParty) {
        this.taxiParty = taxiParty;
        taxiParty.getTaxiGroupList().add(this);
    }

    protected static void create(Long userId, TaxiParty taxiParty) {
        TaxiGroup taxiGroup = TaxiGroup.builder()
                .userId(userId)
                .build();
        taxiGroup.assignTaxiParty(taxiParty);
    }
}
