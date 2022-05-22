package com.api.smucommuting.chat.domain.repository;

import com.api.smucommuting.chat.domain.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
}
