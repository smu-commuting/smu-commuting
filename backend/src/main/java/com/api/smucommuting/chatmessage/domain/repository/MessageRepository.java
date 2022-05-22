package com.api.smucommuting.chatmessage.domain.repository;

import com.api.smucommuting.chatmessage.domain.Message;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<Message, Long> {
}
