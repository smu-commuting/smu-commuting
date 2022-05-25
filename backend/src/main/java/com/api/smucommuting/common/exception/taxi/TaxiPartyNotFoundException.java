package com.api.smucommuting.common.exception.taxi;

import com.api.smucommuting.common.exception.EntityNotFoundException;

public class TaxiPartyNotFoundException extends EntityNotFoundException {
    public TaxiPartyNotFoundException() {
        super("해당 택시파티가 존재하지 않습니다.");
    }
}
