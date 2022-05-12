package com.api.smucommuting.user.domain.repository;

import com.api.smucommuting.user.domain.UserVerificationCode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserVerificationCodeRepository extends JpaRepository<UserVerificationCode, Long> {
}
