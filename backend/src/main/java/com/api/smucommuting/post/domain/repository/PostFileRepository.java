package com.api.smucommuting.post.domain.repository;

import com.api.smucommuting.post.domain.PostFile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PostFileRepository extends JpaRepository<PostFile, Long> {
    Optional<PostFile> findByPostId(Long postId);
}
