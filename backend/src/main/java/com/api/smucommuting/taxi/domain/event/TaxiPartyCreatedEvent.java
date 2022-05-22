package com.api.smucommuting.taxi.domain.event;

import com.api.smucommuting.common.event.Event;

public class TaxiPartyCreatedEvent extends Event {
    private Long taxiPartyId;
    private Long userId;

    public TaxiPartyCreatedEvent(Long taxiPartyId, Long userId) {
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
