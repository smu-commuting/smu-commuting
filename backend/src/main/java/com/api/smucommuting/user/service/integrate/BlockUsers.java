package com.api.smucommuting.user.service.integrate;

import com.api.smucommuting.blockeduser.domain.BlockedUser;

import java.util.List;

public interface BlockUsers {
    List<BlockedUser> findAllByUserId(Long userId);
}
