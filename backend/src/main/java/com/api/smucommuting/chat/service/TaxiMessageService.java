package com.api.smucommuting.chat.service;

import com.api.smucommuting.chat.domain.TaxiMessage;
import com.api.smucommuting.chat.domain.repository.TaxiMessageRepository;
import com.api.smucommuting.chat.dto.TaxiMessageRequest;
import com.api.smucommuting.chat.dto.TaxiMessageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TaxiMessageService {
    private final TaxiMessageRepository taxiMessageRepository;

    @Transactional
    public TaxiMessageResponse save(TaxiMessageRequest request) {
        TaxiMessage taxiMessage = taxiMessageRepository.save(request.toEntity());
        taxiMessage.send();
        return TaxiMessageResponse.build(taxiMessage);
    }

    public List<TaxiMessageResponse> getMessages(Long roomId, int size, String lastMessageDate) {
        List<TaxiMessage> taxiMessages = taxiMessageRepository.findAllByTaxiPartyIdAndCreatedAtIsBeforeOrderByCreatedAtDesc(roomId, LocalDateTime.parse(lastMessageDate), PageRequest.of(0, size));
        return TaxiMessageResponse.listOf(taxiMessages);
    }
}
