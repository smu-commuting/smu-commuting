package com.api.smucommuting.common.exception.chat;

import com.api.smucommuting.common.exception.EntityNotFoundException;

public class ChatRoomNotFoundException extends EntityNotFoundException {
    public ChatRoomNotFoundException() {
        super("해당 채팅방이 없습니다.");
    }
}
