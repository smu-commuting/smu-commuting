package com.api.smucommuting.user.service.integrate;

import com.api.smucommuting.user.domain.User;
import com.api.smucommuting.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
class UserFinder implements Users {
    private final UserRepository userRepository;

    @Override
    public List<User> findAllByUserIdIn(List<Long> userIdList) {
        return userRepository.findAllByIdIn(userIdList);
    }
}
