package com.api.smucommuting.post.domain;

import com.api.smucommuting.common.entity.BaseTimeEntity;
import com.api.smucommuting.user.domain.User;
import lombok.*;

import javax.persistence.*;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "post_reply")
public class PostReply extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User writer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    @Column(name = "content")
    private String content;

    private void setPost(Post post) {
        this.post = post;
        post.getPostReplyList().add(this);
    }

    public void update(PostReply updatedReply, PostReply originReply, PostReplyValidator postReplyValidator, User loginUser) {
        postReplyValidator.updateValidate(originReply, loginUser);
        this.content = updatedReply.getContent();
    }

    public void delete(PostReply reply, PostReplyValidator postReplyValidator, User loginUser) {
        postReplyValidator.deleteValidate(reply, loginUser);
    }

    public Boolean isMine(User loginUser) {
        return this.writer.getId().equals(loginUser.getId());
    }

    public static PostReply create(PostReply postReply, Post post, User loginUser) {
        PostReply reply = PostReply.builder()
                .writer(loginUser)
                .content(postReply.getContent())
                .build();
        reply.setPost(post);
        return reply;
    }
}
