package com.api.smucommuting.chatmessage.service;

import com.api.smucommuting.chatmessage.domain.Message;
import com.api.smucommuting.chatmessage.domain.repository.MessageRepository;
import com.api.smucommuting.chatmessage.dto.MessageRequest;
import com.api.smucommuting.chatmessage.dto.MessageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class MessageService {
    private final MessageRepository messageRepository;

    public MessageResponse save(MessageRequest request) {
        Message message = messageRepository.save(request.toEntity());
        return MessageResponse.build(message);
    }

    @Transactional(readOnly = true)
    public List<MessageResponse> getMessages(Long roomId, int size, String lastMessageDate) {
        List<Message> messages = messageRepository.findAllByChatRoomIdAndCreatedAtIsBeforeOrderByCreatedAtDesc(roomId, LocalDateTime.parse(lastMessageDate), PageRequest.of(0, size));
        return MessageResponse.listOf(messages);
    }
}
