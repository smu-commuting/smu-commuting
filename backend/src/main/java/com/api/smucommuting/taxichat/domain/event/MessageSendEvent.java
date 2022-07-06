package com.api.smucommuting.taxichat.domain.event;

import com.api.smucommuting.common.event.Event;

public class MessageSendEvent extends Event {
    private final Long taxiPartyId;
    private final String title;
    private final String body;

    public MessageSendEvent(Long taxiPartyId, String title, String body) {
        super();
        this.taxiPartyId = taxiPartyId;
        this.title = title;
        this.body = body;
    }

    public Long getTaxiPartyId() {
        return taxiPartyId;
    }

    public String getTitle() {
        return title;
    }

    public String getBody() {
        return body;
    }
}
