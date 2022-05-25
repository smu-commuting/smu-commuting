package com.api.smucommuting.chat.domain.repository;

import com.api.smucommuting.chat.domain.ChatRoom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {
    Optional<ChatRoom> findByTaxiPartyId(Long taxiPartyId);

    @Query("select distinct room from ChatRoom room join room.users chatUser where chatUser.userId=:userId order by room.createdAt desc")
    List<ChatRoom> findAllByUser(@Param("userId") Long userId);
}
