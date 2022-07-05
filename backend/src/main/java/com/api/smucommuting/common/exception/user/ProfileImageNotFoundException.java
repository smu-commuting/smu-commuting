package com.api.smucommuting.common.exception.user;

import com.api.smucommuting.common.exception.EntityNotFoundException;

public class ProfileImageNotFoundException extends EntityNotFoundException {
    public ProfileImageNotFoundException() {
        super("해당 프로필 이미지가 존재하지 않습니다.");
    }
}
