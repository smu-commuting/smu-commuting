package com.api.smucommuting.post.domain.repository;

import com.api.smucommuting.post.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PostRepository extends JpaRepository<Post, Long> {
}
