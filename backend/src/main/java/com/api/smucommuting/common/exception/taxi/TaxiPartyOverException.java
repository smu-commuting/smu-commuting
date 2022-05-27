package com.api.smucommuting.common.exception.taxi;

import com.api.smucommuting.common.exception.BusinessException;

public class TaxiPartyOverException extends BusinessException {
    public TaxiPartyOverException() {
        super("현재시각 전후 30분 사이에 속한 택시그룹이 있습니다.");
    }
}
