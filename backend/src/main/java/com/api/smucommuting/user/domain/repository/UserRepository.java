package com.api.smucommuting.user.domain.repository;

import com.api.smucommuting.user.domain.SocialLoginProvider;
import com.api.smucommuting.user.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findBySocialLoginProviderAndOauthId(SocialLoginProvider provider, String oauthId);
}
