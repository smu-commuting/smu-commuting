package com.api.smucommuting.user.domain.repository;

import com.api.smucommuting.user.domain.UserVerificationCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserVerificationCodeRepository extends JpaRepository<UserVerificationCode, Long> {
    Optional<UserVerificationCode> findByUserId(Long userId);

    List<UserVerificationCode> findAllByUserIdIn(List<Long> userId);
}
