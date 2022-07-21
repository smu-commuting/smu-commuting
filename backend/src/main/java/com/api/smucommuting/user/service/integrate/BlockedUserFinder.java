package com.api.smucommuting.user.service.integrate;

import com.api.smucommuting.blockeduser.domain.BlockedUser;
import com.api.smucommuting.blockeduser.domain.repository.BlockedUserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
class BlockedUserFinder implements BlockUsers {
    private final BlockedUserRepository blockedUserRepository;

    @Override
    public List<BlockedUser> findAllByUserId(Long userId) {
        return blockedUserRepository.findAllByUserId(userId);
    }
}
