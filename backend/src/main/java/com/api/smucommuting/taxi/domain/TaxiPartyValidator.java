package com.api.smucommuting.taxi.domain;

import com.api.smucommuting.common.exception.InvalidValueException;
import com.api.smucommuting.common.exception.PermissionException;
import com.api.smucommuting.common.exception.taxi.TaxiPartyFullException;
import com.api.smucommuting.common.exception.taxi.TaxiPartyNotFoundException;
import com.api.smucommuting.common.exception.taxi.TaxiPartyOverException;
import com.api.smucommuting.taxi.domain.repository.TaxiPartyRepository;
import com.api.smucommuting.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.stream.Collectors;

@Component
@RequiredArgsConstructor
public class TaxiPartyValidator {
    private final TaxiPartyRepository taxiPartyRepository;

    public void createValidate(Long loginUserId, LocalDateTime meetingTime) {
        betweenTimeValidate(loginUserId, meetingTime);
    }

    public void joinValidate(Long taxiPartyId, Long loginUserId, LocalDateTime meetingTime) {
        betweenTimeValidate(loginUserId, meetingTime);
        TaxiParty taxiParty = taxiPartyRepository.findById(taxiPartyId).orElseThrow(TaxiPartyNotFoundException::new);
        fullValidate(taxiParty);
    }

    private void fullValidate(TaxiParty taxiParty) {
        if (taxiParty.getTaxiGroupList().size() == taxiParty.getMaximum()) {
            throw new TaxiPartyFullException();
        }
    }

    private void betweenTimeValidate(Long loginUserId, LocalDateTime meetingTime) {
        if (taxiPartyRepository.findBetweenMeetingTimeInUser(loginUserId, meetingTime).isPresent()) {
            throw new TaxiPartyOverException();
        }
    }

    public void updateValidate(User loginUser, int maximum, TaxiParty taxiParty) {
        if (!taxiParty.getTaxiGroupList().stream().map(TaxiGroup::getUserId).collect(Collectors.toList()).contains(loginUser.getId())) {
            throw new PermissionException();
        }
        if (maximum < taxiParty.getTaxiGroupList().size()) {
            throw new InvalidValueException("현재 인원보다 적은 인원으로 수정할 수 없습니다.");
        }
    }
}
