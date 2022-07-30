package com.api.smucommuting.taxi.service;

import com.api.smucommuting.blockeduser.domain.BlockedUser;
import com.api.smucommuting.common.dto.PageDto;
import com.api.smucommuting.common.exception.taxi.TaxiPartyNotFoundException;
import com.api.smucommuting.taxi.domain.*;
import com.api.smucommuting.taxi.domain.repository.TaxiExitGroupRepository;
import com.api.smucommuting.taxi.domain.repository.TaxiGroupRepository;
import com.api.smucommuting.taxi.domain.repository.TaxiPartyRepository;
import com.api.smucommuting.taxi.dto.TaxiPartyRequest;
import com.api.smucommuting.taxi.dto.TaxiPartyResponse;
import com.api.smucommuting.taxi.service.integrate.TaxiPartyInfo;
import com.api.smucommuting.user.domain.User;
import com.api.smucommuting.user.service.integrate.BlockUsers;
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
    private final TaxiExitGroupRepository taxiExitGroupRepository;
    private final TaxiPartyInfo taxiPartyInfo;
    private final TaxiPartyValidator taxiPartyValidator;
    private final Users users;
    private final BlockUsers blockUsers;

    public void create(TaxiPartyRequest.Create request, User loginUser) {
        TaxiPlace taxiPlace = taxiPartyInfo.getTaxiPlace(request.getPlaceId());
        TaxiParty createdParty = TaxiParty.create(taxiPlace, request.getHeadcount(), request.getMeetingDate(), loginUser.getId(), taxiPartyValidator);
        taxiPartyRepository.save(createdParty);
    }

    public void join(Long taxiPartyId, User loginUser) {
        TaxiParty taxiParty = taxiPartyInfo.getTaxiParty(taxiPartyId);
        if (taxiExitGroupRepository.findByUserId(loginUser.getId()).isPresent()) {
            taxiExitGroupRepository.deleteByUserId(loginUser.getId());
        }
        taxiGroupRepository.save(TaxiGroup.createWithValidate(loginUser.getId(), taxiParty, taxiPartyValidator));
    }

    @Transactional(readOnly = true)
    public TaxiPartyResponse.GetOne getOne(Long taxiPartyId, User loginUser) {
        TaxiParty taxiParty = taxiPartyRepository.findByIdWithTaxiGroupAndPlace(taxiPartyId).orElseThrow(TaxiPartyNotFoundException::new);
        List<Long> partyUserIdList = taxiParty.getTaxiGroupList().stream().map(TaxiGroup::getUserId).collect(Collectors.toList());
        List<Long> blockedUserIdList = blockUsers.findAllByUserId(loginUser.getId()).stream().map(BlockedUser::getBlockedUserId).collect(Collectors.toList());

        return TaxiPartyResponse.GetOne.build(taxiParty, partyUserIdList, blockedUserIdList);
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
    public List<TaxiPartyResponse.TaxiPartyUsers> getTaxiPartyUsers(Long taxiPartyId, User loginUser) {
        List<Long> userIds = taxiGroupRepository.findAllByTaxiPartyId(taxiPartyId).stream().map(TaxiGroup::getUserId).collect(Collectors.toList());
        List<User> userList = users.findAllByUserIdIn(userIds);
        List<Long> blockedUserIdList = blockUsers.findAllByUserId(loginUser.getId()).stream().map(BlockedUser::getBlockedUserId).collect(Collectors.toList());

        return TaxiPartyResponse.TaxiPartyUsers.listsOf(userList, blockedUserIdList);
    }

    @Transactional(readOnly = true)
    public List<TaxiPartyResponse.TaxiPartyUsers> getTaxiPartyExitUsers(Long taxiPartyId, User loginUser) {
        List<Long> userIds = taxiExitGroupRepository.findAllByTaxiPartyId(taxiPartyId).stream().map(TaxiExitGroup::getUserId).collect(Collectors.toList());
        List<User> userList = users.findAllByUserIdIn(userIds);
        List<Long> blockedUserIdList = blockUsers.findAllByUserId(loginUser.getId()).stream().map(BlockedUser::getBlockedUserId).collect(Collectors.toList());

        return TaxiPartyResponse.TaxiPartyUsers.listsOf(userList, blockedUserIdList);
    }

    public void update(Long taxiPartyId, TaxiPartyRequest.Update request, User loginUser) {
        TaxiParty taxiParty = taxiPartyRepository.findByIdWithTaxiGroup(taxiPartyId).orElseThrow(TaxiPartyNotFoundException::new);
        taxiParty.update(request.getMaximum(), loginUser, taxiPartyValidator, taxiParty);
    }

    public void exit(Long taxiPartyId, Long loginUserId) {
        TaxiParty taxiParty = taxiPartyRepository.findByIdWithTaxiGroup(taxiPartyId).orElseThrow(TaxiPartyNotFoundException::new);
        List<TaxiGroup> taxiGroupList = taxiParty.getTaxiGroupList();
        if (taxiGroupList.size() == 1) {
            taxiPartyRepository.deleteById(taxiPartyId);
        } else {
            taxiGroupList.removeIf(taxiGroup -> taxiGroup.getUserId().equals(loginUserId));
            taxiGroupRepository.deleteByTaxiPartyIdAndUserId(taxiPartyId, loginUserId);
            TaxiExitGroup taxiExitGroup = TaxiExitGroup.create(loginUserId, taxiParty);
            taxiExitGroupRepository.save(taxiExitGroup);
        }
    }
}
