package com.api.smucommuting.chat.domain.repository;

import com.api.smucommuting.chat.domain.ChatUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatUserRepository extends JpaRepository<ChatUser, Long> {
    void deleteByChatRoomIdAndUserId(Long chatroomId, Long userId);
}
