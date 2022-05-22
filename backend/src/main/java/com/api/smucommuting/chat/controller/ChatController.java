package com.api.smucommuting.chat.controller;

import com.api.smucommuting.auth.domain.security.CurrentUser;
import com.api.smucommuting.auth.domain.security.CustomUserDetails;
import com.api.smucommuting.chat.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat")
public class ChatController {
    private final ChatService chatService;

    @GetMapping("/rooms")
    public void getRooms(@CurrentUser CustomUserDetails customUserDetails) {
        chatService.getList(customUserDetails.getUser());
    }

}
