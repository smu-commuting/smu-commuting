package com.api.smucommuting.post.domain;

import com.api.smucommuting.common.entity.BaseTimeEntity;
import com.api.smucommuting.user.domain.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Entity
@Table(name = "post")
public class Post extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "content")
    private String content;

    @Column(name = "place")
    private String place;

    @Column(name = "item")
    private String item;

    @Column(name = "obtain_date")
    private LocalDateTime obtainDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User writer;

    @OneToOne(mappedBy = "post", cascade = CascadeType.REMOVE)
    private PostFile postFile;

    @Builder.Default
    @OneToMany(mappedBy = "post", cascade = CascadeType.REMOVE)
    private List<PostReply> postReplyList = new ArrayList<>();

    protected void setPostFile(PostFile postFile) {
        this.postFile = postFile;
    }

    public Boolean isMine(User loginUser) {
        return this.writer.equals(loginUser);
    }

    public void delete(PostValidator postValidator, User loginUser) {
        postValidator.deleteValidate(this, loginUser);
    }

    public static Post create(Post post, User user) {
        return Post.builder()
                .content(post.getContent())
                .item(post.getItem())
                .place(post.getPlace())
                .obtainDate(post.getObtainDate())
                .writer(user)
                .build();
    }

    public void update(Post updatedPost, Post originPost, PostValidator postValidator, User loginUser) {
        postValidator.updateValidate(originPost, loginUser);
        this.content = updatedPost.getContent();
        this.obtainDate = updatedPost.getObtainDate();
        this.item = updatedPost.getItem();
        this.place = updatedPost.getPlace();
    }
}
