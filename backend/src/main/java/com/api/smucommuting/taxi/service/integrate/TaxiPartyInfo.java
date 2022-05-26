package com.api.smucommuting.taxi.service.integrate;

import com.api.smucommuting.taxi.domain.TaxiParty;
import com.api.smucommuting.taxi.domain.TaxiPlace;

public interface TaxiPartyInfo {
    TaxiParty getTaxiParty(Long taxiPartyId);

    TaxiPlace getTaxiPlace(Long taxiPlace);
}
