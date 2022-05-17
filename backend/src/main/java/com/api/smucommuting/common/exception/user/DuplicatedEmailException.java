package com.api.smucommuting.common.exception.user;

import com.api.smucommuting.common.exception.InvalidValueException;

public class DuplicatedEmailException extends InvalidValueException {
    public DuplicatedEmailException() {
        super("중복된 이메일입니다.");
    }
}
