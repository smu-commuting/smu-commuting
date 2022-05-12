package com.api.smucommuting.user.service;

import com.api.smucommuting.common.exception.InvalidValueException;
import com.api.smucommuting.common.exception.user.VerificationCodeNotFoundException;
import com.api.smucommuting.user.domain.User;
import com.api.smucommuting.user.domain.UserVerificationCode;
import com.api.smucommuting.user.domain.repository.UserVerificationCodeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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

    public void validateCode(User loginUser, String verificationCode, LocalDateTime now) {
        UserVerificationCode myCode = userVerificationCodeRepository.findByUserId(loginUser.getId()).orElseThrow(VerificationCodeNotFoundException::new);
        if (!verificationCode.equals(myCode.getCode()) || myCode.getExpirationDate().isBefore(now)) {
            throw new InvalidValueException("잘못된 코드입니다.");
        }
    }
}
