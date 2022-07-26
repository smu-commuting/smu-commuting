package com.api.smucommuting.chat.controller;

import com.api.smucommuting.chat.dto.BusOpenChatRequest;
import com.api.smucommuting.chat.dto.BusOpenChatResponse;
import com.api.smucommuting.chat.service.BusOpenChatService;
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
public class BusOpenChatController {
    private final SimpMessageSendingOperations messageTemplate;
    private final BusOpenChatService busOpenChatService;

    @MessageMapping("/chat/bus/message")
    public void message(BusOpenChatRequest message) {
        BusOpenChatResponse response = busOpenChatService.save(message);
        messageTemplate.convertAndSend("/sub/chat/bus/room/" + response.getRoomId(), response);
    }

    @GetMapping("/api/chat/bus/room/{roomId}/messages")
    public ResponseEntity<ApiResult<List<BusOpenChatResponse>>> getMessages(@PathVariable Long roomId,
                                                                            @RequestParam int size,
                                                                            @RequestParam String lastMessageDate) {
        List<BusOpenChatResponse> response = busOpenChatService.getMessages(roomId, size, lastMessageDate);
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }
}
