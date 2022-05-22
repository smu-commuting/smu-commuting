package com.api.smucommuting.taxi.service;

import com.api.smucommuting.common.dto.PageDto;
import com.api.smucommuting.common.exception.taxi.TaxiPartyNotFoundException;
import com.api.smucommuting.common.exception.taxi.TaxiPlaceNotFoundException;
import com.api.smucommuting.taxi.domain.TaxiGroup;
import com.api.smucommuting.taxi.domain.TaxiParty;
import com.api.smucommuting.taxi.domain.TaxiPlace;
import com.api.smucommuting.taxi.domain.repository.TaxiGroupRepository;
import com.api.smucommuting.taxi.domain.repository.TaxiPartyRepository;
import com.api.smucommuting.taxi.domain.repository.TaxiPlaceRepository;
import com.api.smucommuting.taxi.dto.TaxiPartyRequest;
import com.api.smucommuting.taxi.dto.TaxiPartyResponse;
import com.api.smucommuting.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class TaxiPartyService {
    private final TaxiPartyRepository taxiPartyRepository;
    private final TaxiPlaceRepository taxiPlaceRepository;
    private final TaxiGroupRepository taxiGroupRepository;

    public void create(TaxiPartyRequest.Create request, User loginUser) {
        TaxiPlace taxiPlace = taxiPlaceRepository.findById(request.getPlaceId()).orElseThrow(TaxiPlaceNotFoundException::new);
        TaxiParty createdParty = TaxiParty.create(taxiPlace, request.getHeadcount(), request.getMeetingDate(), loginUser.getId());
        TaxiParty party = taxiPartyRepository.save(createdParty);
        party.created(party.getId(), loginUser.getId());
    }

    public void join(Long taxiPartyId, User user) {
        TaxiParty taxiParty = taxiPartyRepository.findById(taxiPartyId).orElseThrow(TaxiPartyNotFoundException::new);
        taxiGroupRepository.save(TaxiGroup.create(user.getId(), taxiParty));
    }

    @Transactional(readOnly = true)
    public List<TaxiPartyResponse.GetList> getList(Long placeId, LocalDate meetingDate, LocalDateTime now, PageDto pageDto) {
        List<TaxiParty> taxiParties = taxiPartyRepository.findAllByPlaceAndDate(placeId, meetingDate, now, pageDto.of());
        return taxiParties.stream().map(TaxiPartyResponse.GetList::build).collect(Collectors.toList());
    }
}
