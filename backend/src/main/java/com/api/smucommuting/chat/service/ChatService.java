package com.api.smucommuting.chat.service;

import com.api.smucommuting.chat.domain.ChatRoom;
import com.api.smucommuting.chat.domain.repository.ChatRoomRepository;
import com.api.smucommuting.chat.domain.repository.ChatUserRepository;
import com.api.smucommuting.chat.dto.ChatRoomResponse;
import com.api.smucommuting.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class ChatService {
    private final ChatRoomRepository chatRoomRepository;
    private final ChatUserRepository chatUserRepository;

    @Transactional(readOnly = true)
    public List<ChatRoomResponse.GetList> getRoomList(User loginUser) {
        List<ChatRoom> chatRoomList = chatRoomRepository.findAllByUser(loginUser.getId());
        return chatRoomList.stream().map(ChatRoomResponse.GetList::build).collect(Collectors.toList());
    }

    public void exit(Long roomId, Long loginUserId) {
        chatUserRepository.deleteByChatRoomIdAndUserId(roomId, loginUserId);
        //TODO 나가고 채팅방에 있는 사람이 없다면 채팅방 삭제
    }
}
