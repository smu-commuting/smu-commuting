package com.api.smucommuting.user.service.integrate;

import com.api.smucommuting.user.domain.UserVerificationCode;
import com.api.smucommuting.user.domain.repository.UserVerificationCodeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
class UserVerificationFinder implements UserVerifications {
    private final UserVerificationCodeRepository codeRepository;

    @Override
    public List<UserVerificationCode> findAllByUserIdIn(List<Long> userId) {
        return codeRepository.findAllByUserIdIn(userId);
    }
}
