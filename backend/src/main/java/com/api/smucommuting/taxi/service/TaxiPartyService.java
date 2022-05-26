package com.api.smucommuting.taxi.service;

import com.api.smucommuting.common.dto.PageDto;
import com.api.smucommuting.common.exception.taxi.TaxiGroupNotFoundException;
import com.api.smucommuting.taxi.domain.TaxiGroup;
import com.api.smucommuting.taxi.domain.TaxiGroupUserStatus;
import com.api.smucommuting.taxi.domain.TaxiParty;
import com.api.smucommuting.taxi.domain.TaxiPlace;
import com.api.smucommuting.taxi.domain.repository.TaxiGroupRepository;
import com.api.smucommuting.taxi.domain.repository.TaxiPartyRepository;
import com.api.smucommuting.taxi.dto.TaxiPartyRequest;
import com.api.smucommuting.taxi.dto.TaxiPartyResponse;
import com.api.smucommuting.taxi.service.integrate.TaxiPartyInfo;
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
    private final TaxiGroupRepository taxiGroupRepository;
    private final TaxiPartyInfo taxiPartyInfo;
    private final Users users;

    public void create(TaxiPartyRequest.Create request, User loginUser) {
        TaxiPlace taxiPlace = taxiPartyInfo.getTaxiPlace(request.getPlaceId());
        TaxiParty createdParty = TaxiParty.create(taxiPlace, request.getHeadcount(), request.getMeetingDate(), loginUser.getId());
        taxiPartyRepository.save(createdParty);
    }

    public void join(Long taxiPartyId, User loginUser) {
        TaxiParty taxiParty = taxiPartyInfo.getTaxiParty(taxiPartyId);
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
        List<User> userList = users.findAllByUserIdIn(userIds);
        return TaxiPartyResponse.TaxiPartyUsers.listsOf(userList);
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
