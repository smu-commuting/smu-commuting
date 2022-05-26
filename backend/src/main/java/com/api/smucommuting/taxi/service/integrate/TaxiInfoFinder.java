package com.api.smucommuting.taxi.service.integrate;

import com.api.smucommuting.common.exception.taxi.TaxiPartyNotFoundException;
import com.api.smucommuting.common.exception.taxi.TaxiPlaceNotFoundException;
import com.api.smucommuting.taxi.domain.TaxiParty;
import com.api.smucommuting.taxi.domain.TaxiPlace;
import com.api.smucommuting.taxi.domain.repository.TaxiPartyRepository;
import com.api.smucommuting.taxi.domain.repository.TaxiPlaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
class TaxiInfoFinder implements TaxiPartyInfo {
    private final TaxiPartyRepository taxiPartyRepository;
    private final TaxiPlaceRepository taxiPlaceRepository;

    @Override
    public TaxiParty getTaxiParty(Long taxiPartyId) {
        return taxiPartyRepository.findById(taxiPartyId).orElseThrow(TaxiPartyNotFoundException::new);
    }

    @Override
    public TaxiPlace getTaxiPlace(Long taxiPlaceId) {
        return taxiPlaceRepository.findById(taxiPlaceId).orElseThrow(TaxiPlaceNotFoundException::new);
    }
}
