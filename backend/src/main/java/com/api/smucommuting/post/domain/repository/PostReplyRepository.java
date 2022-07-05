package com.api.smucommuting.post.domain.repository;

import com.api.smucommuting.post.domain.PostReply;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PostReplyRepository extends JpaRepository<PostReply, Long> {
    @Query("select pr from PostReply pr join fetch pr.writer writer left join fetch writer.profileImage where pr.post.id=:postId order by pr.id asc")
    List<PostReply> findAllByPostIdWithWriter(Long postId);
}
