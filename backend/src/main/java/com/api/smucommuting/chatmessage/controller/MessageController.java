package com.api.smucommuting.chatmessage.controller;

import com.api.smucommuting.chatmessage.dto.MessageRequest;
import com.api.smucommuting.chatmessage.dto.MessageResponse;
import com.api.smucommuting.chatmessage.service.MessageService;
import com.api.smucommuting.common.dto.ApiResult;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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

    @GetMapping("/api/chat/room/{roomId}/messages")
    public ResponseEntity<ApiResult<List<MessageResponse>>> getMessages(@PathVariable Long roomId,
                                                                        @RequestParam int size,
                                                                        @RequestParam String lastMessageDate) {
        List<MessageResponse> response = messageService.getMessages(roomId, size, lastMessageDate);
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }
}
