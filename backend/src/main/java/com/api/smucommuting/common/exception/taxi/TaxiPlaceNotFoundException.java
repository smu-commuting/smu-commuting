package com.api.smucommuting.common.exception.taxi;

import com.api.smucommuting.common.exception.EntityNotFoundException;

public class TaxiPlaceNotFoundException extends EntityNotFoundException {
    public TaxiPlaceNotFoundException() {
        super("해당 택시합승 장소가 없습니다.");
    }
}
