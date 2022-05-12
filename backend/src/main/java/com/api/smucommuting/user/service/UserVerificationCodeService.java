package com.api.smucommuting.user.service;

import com.api.smucommuting.user.domain.User;
import com.api.smucommuting.user.domain.UserVerificationCode;
import com.api.smucommuting.user.domain.repository.UserVerificationCodeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
class UserVerificationCodeService {
    private final UserVerificationCodeRepository userVerificationCodeRepository;

    public UserVerificationCode create(User user) {
        UserVerificationCode userVerificationCode = UserVerificationCode.create(user);
        Optional<UserVerificationCode> optionalCode = userVerificationCodeRepository.findByUserId(user.getId());
        if (optionalCode.isPresent()) {
            return optionalCode.get().update(userVerificationCode);
        }
        return userVerificationCodeRepository.save(userVerificationCode);
    }
}
