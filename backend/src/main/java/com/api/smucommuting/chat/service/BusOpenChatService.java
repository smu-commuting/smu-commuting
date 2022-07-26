package com.api.smucommuting.chat.service;

import com.api.smucommuting.chat.domain.BusOpenChatMessage;
import com.api.smucommuting.chat.domain.repository.BusOpenChatMessageRepository;
import com.api.smucommuting.chat.dto.BusOpenChatRequest;
import com.api.smucommuting.chat.dto.BusOpenChatResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BusOpenChatService {
    private final BusOpenChatMessageRepository busOpenChatMessageRepository;

    @Transactional
    public BusOpenChatResponse save(BusOpenChatRequest request) {
        BusOpenChatMessage busOpenChatMessage = busOpenChatMessageRepository.save(request.toEntity());

        return BusOpenChatResponse.build(busOpenChatMessage);
    }

    public List<BusOpenChatResponse> getMessages(Long roomId, int size, String lastMessageDate) {
        List<BusOpenChatMessage> openChatMessage = busOpenChatMessageRepository.findAllByBusOpenChatIdAndCreatedAtIsBeforeOrderByCreatedAtDesc(roomId, LocalDateTime.parse(lastMessageDate), PageRequest.of(0, size));
        return BusOpenChatResponse.listOf(openChatMessage);
    }
}
