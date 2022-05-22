package com.api.smucommuting.chatmessage.controller;

import com.api.smucommuting.chatmessage.dto.MessageRequest;
import com.api.smucommuting.chatmessage.dto.MessageResponse;
import com.api.smucommuting.chatmessage.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MessageController {
    private final SimpMessageSendingOperations messageTemplate;
    private final MessageService messageService;

    @MessageMapping("/chat/message")
    public void message(MessageRequest message) {
        MessageResponse response = messageService.save(message);
        messageTemplate.convertAndSend("/sub/chat/room/" + response.getRoomId(), response);
    }
}
