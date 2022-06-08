package com.api.smucommuting.common.exception.taxi;

import com.api.smucommuting.common.exception.BusinessException;

public class TaxiPartyFullException extends BusinessException {
    public TaxiPartyFullException() {
        super("택시그룹이 가득찼습니다.");
    }
}
