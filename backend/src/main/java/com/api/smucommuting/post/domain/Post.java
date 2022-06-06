package com.api.smucommuting.post.domain;

import com.api.smucommuting.common.entity.BaseTimeEntity;
import com.api.smucommuting.user.domain.User;
import lombok.*;

import javax.persistence.*;
import java.time.LocalDateTime;

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

    protected void setPostFile(PostFile postFile) {
        this.postFile = postFile;
    }

    public Boolean isMine(User loginUser) {
        return this.writer.equals(loginUser);
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
}
