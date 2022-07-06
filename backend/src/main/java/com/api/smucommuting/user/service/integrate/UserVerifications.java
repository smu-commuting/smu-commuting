package com.api.smucommuting.user.service.integrate;

import com.api.smucommuting.user.domain.UserVerificationCode;

import java.util.List;

public interface UserVerifications {
    List<UserVerificationCode> findAllByUserIdIn(List<Long> userId);
}
