package com.api.smucommuting.taxi.service.integrate;

import com.api.smucommuting.common.exception.taxi.TaxiPartyNotFoundException;
import com.api.smucommuting.taxi.domain.TaxiParty;
import com.api.smucommuting.taxi.domain.repository.TaxiPartyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
class TaxiPartyFinder implements TaxiParties {
    private final TaxiPartyRepository taxiPartyRepository;

    @Override
    public TaxiParty getOne(Long taxiPartyId) {
        return taxiPartyRepository.findById(taxiPartyId).orElseThrow(TaxiPartyNotFoundException::new);
    }
}
