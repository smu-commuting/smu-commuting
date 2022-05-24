package com.api.smucommuting.blockeduser.domain.repository;

import com.api.smucommuting.blockeduser.domain.BlockedUser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BlockedUserRepository extends JpaRepository<BlockedUser, Long> {
    List<BlockedUser> findAllByUserId(Long loginUserId);
}
