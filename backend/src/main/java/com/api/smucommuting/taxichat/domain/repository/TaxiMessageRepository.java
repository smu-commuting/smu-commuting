package com.api.smucommuting.taxichat.domain.repository;

import com.api.smucommuting.taxichat.domain.TaxiMessage;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface TaxiMessageRepository extends JpaRepository<TaxiMessage, Long> {
    List<TaxiMessage> findAllByTaxiPartyIdAndCreatedAtIsBeforeOrderByCreatedAtDesc(Long roomId, LocalDateTime lastMessageDate, Pageable pageable);
}
