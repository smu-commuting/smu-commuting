package com.api.smucommuting.chatmessage.service;

import com.api.smucommuting.chatmessage.domain.Message;
import com.api.smucommuting.chatmessage.domain.repository.MessageRepository;
import com.api.smucommuting.chatmessage.dto.MessageRequest;
import com.api.smucommuting.chatmessage.dto.MessageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;

    public MessageResponse save(MessageRequest request) {
        Message message = messageRepository.save(request.toEntity());
        return MessageResponse.build(message);
    }
}
