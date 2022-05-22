package com.api.smucommuting.chat.domain.eventhandler;

import com.api.smucommuting.chat.domain.ChatRoom;
import com.api.smucommuting.chat.domain.ChatUser;
import com.api.smucommuting.chat.domain.repository.ChatRoomRepository;
import com.api.smucommuting.chat.domain.repository.ChatUserRepository;
import com.api.smucommuting.common.exception.chat.ChatRoomNotFoundException;
import com.api.smucommuting.taxi.domain.event.TaxiPartyJoinedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
@RequiredArgsConstructor
public class TaxiPartyJoinedEventHandler {
    private final ChatUserRepository chatUserRepository;
    private final ChatRoomRepository chatRoomRepository;

    @EventListener
    @Transactional
    public void handle(TaxiPartyJoinedEvent event) {
        ChatRoom chatRoom = chatRoomRepository.findByTaxiPartyId(event.getTaxiPartyId()).orElseThrow(ChatRoomNotFoundException::new);
        ChatUser chatUser = ChatUser.create(event.getUserId(), chatRoom);
        chatUserRepository.save(chatUser);
    }
}
