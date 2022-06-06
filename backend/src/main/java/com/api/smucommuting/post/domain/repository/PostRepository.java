package com.api.smucommuting.post.domain.repository;

import com.api.smucommuting.post.domain.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PostRepository extends JpaRepository<Post, Long> {
    @Query("select p from Post p join fetch p.postFile join fetch p.writer where p.id=:postId")
    Optional<Post> findByPostIdWithImageAndWriter(Long postId);
}
