package com.api.smucommuting.taxi.domain;

import com.api.smucommuting.taxi.domain.repository.TaxiGroupRepository;
import com.api.smucommuting.taxi.domain.repository.TaxiPartyRepository;
import com.api.smucommuting.user.domain.event.UserDeletedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class UserDeletedEventHandler {
    private final TaxiGroupRepository taxiGroupRepository;
    private final TaxiPartyRepository taxiPartyRepository;

    @EventListener
    public void handle(UserDeletedEvent event) {
        List<TaxiGroup> taxiGroupList = taxiGroupRepository.findAllByUserId(event.getUserId());
        taxiGroupList.forEach(taxiGroup -> {
            List<TaxiGroup> allByTaxiPartyIdAndStatus = taxiGroupRepository.findAllByTaxiPartyIdAndStatus(taxiGroup.getTaxiParty().getId(), TaxiGroupUserStatus.IN);
            if (allByTaxiPartyIdAndStatus.size() == 1) {
                taxiPartyRepository.deleteById(taxiGroup.getTaxiParty().getId());
            }
        });
        taxiGroupRepository.deleteAllByUserId(event.getUserId());
    }
}
