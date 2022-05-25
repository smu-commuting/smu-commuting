package com.api.smucommuting.taxi.domain.event;

import com.api.smucommuting.common.event.Event;

import java.time.LocalDateTime;

public class TaxiPartyCreatedEvent extends Event {
    private final Long taxiPartyId;
    private final String place;
    private final LocalDateTime meetingTime;
    private final int maximum;
    private final Long userId;

    public TaxiPartyCreatedEvent(Long taxiPartyId, String place, LocalDateTime meetingTime, int maximum, Long userId) {
        this.taxiPartyId = taxiPartyId;
        this.place = place;
        this.meetingTime = meetingTime;
        this.maximum = maximum;
        this.userId = userId;
    }

    public Long getTaxiPartyId() {
        return taxiPartyId;
    }

    public String getPlace() {
        return place;
    }

    public LocalDateTime getMeetingTime() {
        return meetingTime;
    }

    public int getMaximum() {
        return maximum;
    }

    public Long getUserId() {
        return userId;
    }
}
