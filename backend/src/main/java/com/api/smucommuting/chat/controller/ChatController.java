package com.api.smucommuting.chat.controller;

import com.api.smucommuting.auth.domain.security.CurrentUser;
import com.api.smucommuting.auth.domain.security.CustomUserDetails;
import com.api.smucommuting.chat.dto.ChatRoomResponse;
import com.api.smucommuting.chat.service.ChatService;
import com.api.smucommuting.common.dto.ApiResult;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/chat")
public class ChatController {
    private final ChatService chatService;

    @GetMapping("/rooms")
    public ResponseEntity<ApiResult<List<ChatRoomResponse.GetList>>> getRooms(@CurrentUser CustomUserDetails customUserDetails) {
        List<ChatRoomResponse.GetList> response = chatService.getRoomList(customUserDetails.getUser());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value(), response));
    }

    @DeleteMapping("/room/{roomId}")
    public ResponseEntity<ApiResult<Void>> exitRoom(@PathVariable Long roomId, @CurrentUser CustomUserDetails customUserDetails) {
        //TODO 택시방과 같이 나가는 경우 로직 추가
        chatService.exit(roomId, customUserDetails.getUser().getId());
        return ResponseEntity.ok().body(ApiResult.build(HttpStatus.OK.value()));
    }
}
