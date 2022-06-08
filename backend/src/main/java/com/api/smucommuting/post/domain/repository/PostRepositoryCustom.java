package com.api.smucommuting.post.domain.repository;

import com.api.smucommuting.post.domain.Post;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PostRepositoryCustom {
    List<Post> findAllOrderByCreatedAtDesc(Pageable of);
}
