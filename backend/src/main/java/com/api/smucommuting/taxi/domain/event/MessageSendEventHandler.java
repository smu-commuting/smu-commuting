package com.api.smucommuting.taxi.domain.event;

import com.api.smucommuting.common.exception.taxi.TaxiPartyNotFoundException;
import com.api.smucommuting.common.notification.FirebaseCloudMessageService;
import com.api.smucommuting.taxi.domain.TaxiGroup;
import com.api.smucommuting.taxi.domain.TaxiParty;
import com.api.smucommuting.taxi.domain.repository.TaxiPartyRepository;
import com.api.smucommuting.taxichat.domain.event.MessageSendEvent;
import com.api.smucommuting.user.domain.UserVerificationCode;
import com.api.smucommuting.user.service.integrate.UserVerifications;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class MessageSendEventHandler {

    private final TaxiPartyRepository taxiPartyRepository;
    private final FirebaseCloudMessageService firebaseCloudMessageService;
    private final UserVerifications userVerifications;

    @EventListener
    public void handle(MessageSendEvent event) {
        TaxiParty taxiParty = taxiPartyRepository.findByIdWithTaxiGroup(event.getTaxiPartyId()).orElseThrow(TaxiPartyNotFoundException::new);
        List<Long> userIdList = taxiParty.getTaxiGroupList().stream().map(TaxiGroup::getUserId).collect(Collectors.toList());
        List<UserVerificationCode> verificationCodes = userVerifications.findAllByUserIdIn(userIdList);
        List<String> tokens = verificationCodes.stream()
                .map(UserVerificationCode::getFcmToken)
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
        tokens.forEach(token -> firebaseCloudMessageService.sendMessageTo(token, event.getTitle(), event.getBody()));
    }
}
