package com.api.smucommuting.common.exception.taxi;

import com.api.smucommuting.common.exception.EntityNotFoundException;

public class TaxiGroupNotFoundException extends EntityNotFoundException {
    public TaxiGroupNotFoundException() {
        super("택시 그룹에 없는 유저입니다.");
    }
}
