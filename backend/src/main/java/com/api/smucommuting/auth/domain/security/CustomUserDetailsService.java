package com.api.smucommuting.auth.domain.security;

import com.api.smucommuting.user.domain.User;
import com.api.smucommuting.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String id) {
        User user = userRepository.findById(Long.valueOf(id)).orElseThrow(EntityNotFoundException::new);
        return CustomUserDetails.create(user);
    }
}
