package com.api.smucommuting.taxi.service;

import com.api.smucommuting.common.dto.PageDto;
import com.api.smucommuting.common.exception.taxi.TaxiGroupNotFoundException;
import com.api.smucommuting.common.exception.taxi.TaxiPlaceNotFoundException;
import com.api.smucommuting.taxi.domain.TaxiGroup;
import com.api.smucommuting.taxi.domain.TaxiGroupUserStatus;
import com.api.smucommuting.taxi.domain.TaxiParty;
import com.api.smucommuting.taxi.domain.TaxiPlace;
import com.api.smucommuting.taxi.domain.repository.TaxiGroupRepository;
import com.api.smucommuting.taxi.domain.repository.TaxiPartyRepository;
import com.api.smucommuting.taxi.domain.repository.TaxiPlaceRepository;
import com.api.smucommuting.taxi.dto.TaxiPartyRequest;
import com.api.smucommuting.taxi.dto.TaxiPartyResponse;
import com.api.smucommuting.taxi.service.integrate.TaxiParties;
import com.api.smucommuting.user.domain.User;
import com.api.smucommuting.user.service.integrate.Users;
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
    private final TaxiParties taxiParties;
    private final TaxiPlaceRepository taxiPlaceRepository;
    private final TaxiGroupRepository taxiGroupRepository;
    private final Users users;

    public void create(TaxiPartyRequest.Create request, User loginUser) {
        TaxiPlace taxiPlace = taxiPlaceRepository.findById(request.getPlaceId()).orElseThrow(TaxiPlaceNotFoundException::new);
        TaxiParty createdParty = TaxiParty.create(taxiPlace, request.getHeadcount(), request.getMeetingDate(), loginUser.getId());
        taxiPartyRepository.save(createdParty);
    }

    public void join(Long taxiPartyId, User loginUser) {
        TaxiParty taxiParty = taxiParties.getOne(taxiPartyId);
        taxiGroupRepository.save(TaxiGroup.create(loginUser.getId(), taxiParty));
    }

    @Transactional(readOnly = true)
    public List<TaxiPartyResponse.GetList> getList(Long placeId, LocalDate meetingDate, LocalDateTime now, PageDto pageDto) {
        List<TaxiParty> taxiParties = taxiPartyRepository.findAllByPlaceAndDate(placeId, meetingDate, now, pageDto.of());
        return taxiParties.stream().map(TaxiPartyResponse.GetList::build).collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<TaxiPartyResponse.GetMyList> getMyList(User loginUser) {
        List<TaxiParty> taxiParties = taxiPartyRepository.findAllByUser(loginUser.getId());
        return taxiParties.stream().map(TaxiPartyResponse.GetMyList::build).collect(Collectors.toList());
    }


    @Transactional(readOnly = true)
    public List<TaxiPartyResponse.TaxiPartyUsers> getTaxiPartyUsers(Long taxiPartyId, TaxiGroupUserStatus status) {
        List<Long> userIds = taxiGroupRepository.findAllByTaxiPartyIdAndStatus(taxiPartyId, status).stream().map(TaxiGroup::getUserId).collect(Collectors.toList());
        List<User> users = this.users.findAllByUserIdIn(userIds);
        return TaxiPartyResponse.TaxiPartyUsers.listsOf(users);
    }

    public void exit(Long taxiPartyId, Long loginUserId) {
        List<TaxiGroup> allByTaxiPartyIdAndStatus = taxiGroupRepository.findAllByTaxiPartyIdAndStatus(taxiPartyId, TaxiGroupUserStatus.IN);
        if (allByTaxiPartyIdAndStatus.size() == 1) {
            taxiPartyRepository.deleteById(taxiPartyId);
        } else {
            TaxiGroup taxiGroup = taxiGroupRepository.findByTaxiPartyIdAndUserId(taxiPartyId, loginUserId).orElseThrow(TaxiGroupNotFoundException::new);
            taxiGroup.exit();
        }
    }
}
