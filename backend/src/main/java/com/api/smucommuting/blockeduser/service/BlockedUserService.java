package com.api.smucommuting.blockeduser.service;

import com.api.smucommuting.blockeduser.domain.BlockedUser;
import com.api.smucommuting.blockeduser.domain.repository.BlockedUserRepository;
import com.api.smucommuting.blockeduser.dto.BlockedUserRequest;
import com.api.smucommuting.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class BlockedUserService {
    private final BlockedUserRepository blockedUserRepository;

    public void block(BlockedUserRequest.Block request, User loginUser) {
        BlockedUser blockedUser = BlockedUser.create(loginUser.getId(), request.getBlockUserId());
        blockedUserRepository.save(blockedUser);
    }
}
