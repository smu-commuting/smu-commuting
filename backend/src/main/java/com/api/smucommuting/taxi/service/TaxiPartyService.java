package com.api.smucommuting.taxi.service;

import com.api.smucommuting.common.exception.taxi.TaxiPlaceNotFoundException;
import com.api.smucommuting.taxi.domain.TaxiParty;
import com.api.smucommuting.taxi.domain.TaxiPlace;
import com.api.smucommuting.taxi.domain.repository.TaxiPartyRepository;
import com.api.smucommuting.taxi.domain.repository.TaxiPlaceRepository;
import com.api.smucommuting.taxi.dto.TaxiPartyRequest;
import com.api.smucommuting.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class TaxiPartyService {
    private final TaxiPartyRepository taxiPartyRepository;
    private final TaxiPlaceRepository taxiPlaceRepository;

    public void create(TaxiPartyRequest.Create request, User loginUser) {
        TaxiPlace taxiPlace = taxiPlaceRepository.findById(request.getPlaceId()).orElseThrow(TaxiPlaceNotFoundException::new);
        TaxiParty taxiParty = TaxiParty.create(taxiPlace, request.getHeadcount(), request.getMeetingDate(), loginUser.getId());
        taxiPartyRepository.save(taxiParty);
    }
}
