package com.api.smucommuting.chat.domain.eventhandler;

import com.api.smucommuting.chat.domain.ChatRoom;
import com.api.smucommuting.chat.domain.repository.ChatRoomRepository;
import com.api.smucommuting.taxi.domain.event.TaxiPartyCreatedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class TaxiPartyCreatedEventHandler {
    private final ChatRoomRepository chatRoomRepository;

    @EventListener
    @Transactional
    public void handle(TaxiPartyCreatedEvent event) {
        ChatRoom chatRoom = ChatRoom.create(event.getPlace(), event.getMaximum(), event.getMeetingTime(), event.getTaxiPartyId(), event.getUserId());
        chatRoomRepository.save(chatRoom);
    }
}
