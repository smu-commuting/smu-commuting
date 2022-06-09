package com.api.smucommuting.user.domain.event;

import com.api.smucommuting.common.event.Event;

public class UserDeletedEvent extends Event {
    private final Long userId;

    public UserDeletedEvent(Long userId) {
        super();
        this.userId = userId;
    }

    public Long getUserId() {
        return userId;
    }
}
