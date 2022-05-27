package com.api.smucommuting.taxi.domain;

import com.api.smucommuting.common.exception.taxi.TaxiPartyFullException;
import com.api.smucommuting.common.exception.taxi.TaxiPartyNotFoundException;
import com.api.smucommuting.common.exception.taxi.TaxiPartyOverException;
import com.api.smucommuting.taxi.domain.repository.TaxiPartyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

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
}
