package com.api.smucommuting.user.domain;

import com.api.smucommuting.common.exception.user.DuplicatedEmailException;
import com.api.smucommuting.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class UserValidator {
    private final UserRepository userRepository;

    public void emailValidate(String email) {
        if (userRepository.findByEmail(email).isPresent()) {
            throw new DuplicatedEmailException();
        }
    }
}
