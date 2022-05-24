package com.api.smucommuting.user.service.integrate;

import com.api.smucommuting.user.domain.User;

import java.util.List;

public interface Users {
    List<User> findAllByUserIdIn(List<Long> userIdList);
}
