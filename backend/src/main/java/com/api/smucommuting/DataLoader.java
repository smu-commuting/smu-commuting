package com.api.smucommuting;

import com.api.smucommuting.user.domain.Role;
import com.api.smucommuting.user.domain.SocialLoginProvider;
import com.api.smucommuting.user.domain.User;
import com.api.smucommuting.user.domain.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
@RequiredArgsConstructor
@Profile("local")
public class DataLoader implements CommandLineRunner {
    private final UserRepository userRepository;

    @Override
    public void run(String... args) {
        if (userRepository.findAll().isEmpty()) {
            List<User> users = new ArrayList<>();
            for (int i = 1; i < 100; i++) {
                User user = User.builder().oauthId(String.valueOf(i))
                        .studentId(String.valueOf(i))
                        .email("test@test.com")
                        .role(Role.USER)
                        .socialLoginProvider(SocialLoginProvider.KAKAO)
                        .build();
                users.add(user);
            }
            userRepository.saveAll(users);
        }
    }
}
