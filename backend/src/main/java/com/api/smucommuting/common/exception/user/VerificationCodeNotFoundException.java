package com.api.smucommuting.common.exception.user;

import com.api.smucommuting.common.exception.EntityNotFoundException;

public class VerificationCodeNotFoundException extends EntityNotFoundException {
    public VerificationCodeNotFoundException() {
        super("잘못된 코드입니다.");
    }
}
