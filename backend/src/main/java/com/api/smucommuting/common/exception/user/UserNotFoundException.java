package com.api.smucommuting.common.exception.user;

import com.api.smucommuting.common.exception.EntityNotFoundException;

public class UserNotFoundException extends EntityNotFoundException {
    public UserNotFoundException() {
        super("해당 유저가 없습니다.");
    }
}
