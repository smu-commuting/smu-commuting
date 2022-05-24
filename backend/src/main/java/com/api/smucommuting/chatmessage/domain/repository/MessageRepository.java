package com.api.smucommuting.chatmessage.domain.repository;

import com.api.smucommuting.chatmessage.domain.Message;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface MessageRepository extends JpaRepository<Message, Long> {
    List<Message> findAllByChatRoomIdAndCreatedAtIsBeforeOrderByCreatedAtDesc(Long roomId, LocalDateTime lastMessageDate, Pageable pageable);
}
