package com.api.smucommuting.taxichat.controller;

import com.api.smucommuting.taxichat.dto.TaxiMessageRequest;
import com.api.smucommuting.taxichat.dto.TaxiMessageResponse;
import com.api.smucommuting.taxichat.service.TaxiMessageService;
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
public class TaxiMessageController {
    private final SimpMessageSendingOperations messageTemplate;
    private final TaxiMessageService taxiMessageService;

    @MessageMapping("/chat/message")
    public void message(TaxiMessageRequest message) {
        TaxiMessageResponse response = taxiMessageService.save(message);
        messageTemplate.convertAndSend("/sub/chat/room/" + response.getRoomId(), response);
    }

    @GetMapping("/api/chat/room/{roomId}/messages")
    public ResponseEntity<ApiResult<List<TaxiMessageResponse>>> getMessages(@PathVariable Long roomId,
                                                                            @RequestParam int size,
                                                                            @RequestParam String lastMessageDate) {
        List<TaxiMessageResponse> response = taxiMessageService.getMessages(roomId, size, lastMessageDate);
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }
}
