package com.api.smucommuting.taxi.domain;

import com.api.smucommuting.common.entity.BaseTimeEntity;
import lombok.*;

import javax.persistence.*;

@Getter
@Builder(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "taxi_exit_group")
public class TaxiExitGroup extends BaseTimeEntity {
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
        taxiParty.getTaxiExitGroups().add(this);
    }

    public static TaxiExitGroup create(Long userId, TaxiParty taxiParty) {
        TaxiExitGroup taxiGroup = TaxiExitGroup.builder()
                .userId(userId)
                .build();
        taxiGroup.assignTaxiParty(taxiParty);
        return taxiGroup;
    }
}
