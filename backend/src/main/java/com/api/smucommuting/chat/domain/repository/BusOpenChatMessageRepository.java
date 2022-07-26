package com.api.smucommuting.chat.domain.repository;

import com.api.smucommuting.chat.domain.BusOpenChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusOpenChatMessageRepository extends JpaRepository<BusOpenChatMessage, Long> {
}
