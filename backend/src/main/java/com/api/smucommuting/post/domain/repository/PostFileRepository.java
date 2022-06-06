package com.api.smucommuting.post.domain.repository;

import com.api.smucommuting.post.domain.PostFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostFileRepository extends JpaRepository<PostFile, Long> {
}
