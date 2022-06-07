package com.api.smucommuting.post.domain.repository;

import com.api.smucommuting.post.domain.Post;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;

import java.util.List;

import static com.api.smucommuting.post.domain.QPost.post;

@RequiredArgsConstructor
public class PostRepositoryImpl implements PostRepositoryCustom {
    private final JPAQueryFactory queryFactory;

    @Override
    public List<Post> findAllOrderByCreatedAtDesc(Pageable pageable) {
        return queryFactory.selectFrom(post)
                .join(post.postFile).fetchJoin()
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(post.createdAt.desc())
                .fetch();
    }
}
