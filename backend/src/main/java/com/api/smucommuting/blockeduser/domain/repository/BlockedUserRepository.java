package com.api.smucommuting.blockeduser.domain.repository;

import com.api.smucommuting.blockeduser.domain.BlockedUser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BlockedUserRepository extends JpaRepository<BlockedUser, Long> {
}
