package com.api.smucommuting.chat.service;

import com.api.smucommuting.chat.domain.BusOpenChatMessage;
import com.api.smucommuting.chat.domain.repository.BusOpenChatMessageRepository;
import com.api.smucommuting.chat.dto.BusOpenChatRequest;
import com.api.smucommuting.chat.dto.BusOpenChatResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class BusOpenChatService {
    private final BusOpenChatMessageRepository busOpenChatMessageRepository;

    public BusOpenChatResponse save(BusOpenChatRequest request) {
        BusOpenChatMessage busOpenChatMessage = busOpenChatMessageRepository.save(request.toEntity());

        return BusOpenChatResponse.build(busOpenChatMessage);
    }
}
