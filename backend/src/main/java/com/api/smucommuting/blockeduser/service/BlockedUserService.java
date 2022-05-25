package com.api.smucommuting.blockeduser.service;

import com.api.smucommuting.blockeduser.domain.BlockedUser;
import com.api.smucommuting.blockeduser.domain.repository.BlockedUserRepository;
import com.api.smucommuting.blockeduser.dto.BlockedUserRequest;
import com.api.smucommuting.blockeduser.dto.BlockedUserResponse;
import com.api.smucommuting.user.domain.User;
import com.api.smucommuting.user.service.integrate.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class BlockedUserService {
    private final BlockedUserRepository blockedUserRepository;
    private final Users users;

    public void block(BlockedUserRequest.Block request, User loginUser) {
        BlockedUser blockedUser = BlockedUser.create(loginUser.getId(), request.getBlockUserId());
        blockedUserRepository.save(blockedUser);
    }

    @Transactional(readOnly = true)
    public List<BlockedUserResponse> getList(User loginUser) {
        List<BlockedUser> blockedUserList = blockedUserRepository.findAllByUserId(loginUser.getId());
        List<Long> blockedUserIdList = blockedUserList.stream().map(BlockedUser::getBlockedUserId).collect(Collectors.toList());
        List<User> findBlockedUserList = users.findAllByUserIdIn(blockedUserIdList);

        return BlockedUserResponse.listsOf(findBlockedUserList);
    }

    public void cancel(Long blockedUserId, User loginUser) {
        blockedUserRepository.deleteByBlockedUserIdAndUserId(blockedUserId, loginUser.getId());
    }
}
