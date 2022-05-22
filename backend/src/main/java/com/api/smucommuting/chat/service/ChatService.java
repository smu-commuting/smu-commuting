package com.api.smucommuting.chat.service;

import com.api.smucommuting.chat.domain.ChatRoom;
import com.api.smucommuting.chat.domain.repository.ChatRoomRepository;
import com.api.smucommuting.chat.dto.ChatRoomResponse;
import com.api.smucommuting.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatService {
    private final ChatRoomRepository chatRoomRepository;

    public List<ChatRoomResponse.GetList> getRoomList(User loginUser) {
         List<ChatRoom> chatRoomList = chatRoomRepository.findAllByUser(loginUser.getId());
         return chatRoomList.stream().map(ChatRoomResponse.GetList::build).collect(Collectors.toList());
    }
}
