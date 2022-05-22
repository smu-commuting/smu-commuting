package com.api.smucommuting.taxi.domain.event;

import com.api.smucommuting.common.event.Event;

public class TaxiPartyJoinedEvent extends Event {
    private Long taxiPartyId;
    private Long userId;

    public TaxiPartyJoinedEvent(Long taxiPartyId, Long userId) {
        super();
        this.taxiPartyId = taxiPartyId;
        this.userId = userId;
    }

    public Long getTaxiPartyId() {
        return taxiPartyId;
    }

    public Long getUserId() {
        return userId;
    }
}
