package com.api.smucommuting.taxichat.service;

import com.api.smucommuting.taxichat.domain.TaxiMessage;
import com.api.smucommuting.taxichat.domain.repository.TaxiMessageRepository;
import com.api.smucommuting.taxichat.dto.TaxiMessageRequest;
import com.api.smucommuting.taxichat.dto.TaxiMessageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class TaxiMessageService {
    private final TaxiMessageRepository taxiMessageRepository;

    public TaxiMessageResponse save(TaxiMessageRequest request) {
        TaxiMessage taxiMessage = taxiMessageRepository.save(request.toEntity());
        taxiMessage.send();
        return TaxiMessageResponse.build(taxiMessage);
    }

    @Transactional(readOnly = true)
    public List<TaxiMessageResponse> getMessages(Long roomId, int size, String lastMessageDate) {
        List<TaxiMessage> taxiMessages = taxiMessageRepository.findAllByTaxiPartyIdAndCreatedAtIsBeforeOrderByCreatedAtDesc(roomId, LocalDateTime.parse(lastMessageDate), PageRequest.of(0, size));
        return TaxiMessageResponse.listOf(taxiMessages);
    }
}
