package com.api.smucommuting.chat.controller;

import com.api.smucommuting.chat.dto.BusOpenChatRequest;
import com.api.smucommuting.chat.dto.BusOpenChatResponse;
import com.api.smucommuting.chat.service.BusOpenChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class BusOpenChatController {
    private final SimpMessageSendingOperations messageTemplate;
    private final BusOpenChatService busOpenChatService;

    @MessageMapping("/chat/bus/message")
    public void message(BusOpenChatRequest message) {
        BusOpenChatResponse response = busOpenChatService.save(message);
        messageTemplate.convertAndSend("/sub/chat/bus/room/" + response.getRoomId(), response);
    }
}
