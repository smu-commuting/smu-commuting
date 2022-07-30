package com.api.smucommuting.chat.domain.repository;

import com.api.smucommuting.chat.domain.BusOpenChatMessage;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface BusOpenChatMessageRepository extends JpaRepository<BusOpenChatMessage, Long> {
    List<BusOpenChatMessage> findAllByBusOpenChatIdAndCreatedAtIsBeforeOrderByCreatedAtDesc(Long roomId, LocalDateTime lastMessageDate, Pageable pageable);
}
