package com.api.smucommuting.post.domain;

import com.api.smucommuting.common.entity.BaseTimeEntity;
import com.api.smucommuting.common.file.FileServer;
import com.api.smucommuting.common.file.FileType;
import com.api.smucommuting.common.file.SavedFile;
import lombok.*;

import javax.persistence.*;

@Getter
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@Table(name = "post_file")
public class PostFile extends BaseTimeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private FileServer server;

    @Enumerated(EnumType.STRING)
    private FileType type;

    private String name;
    private String extension;
    private String url;
    private Long size;
    private Integer width;
    private Integer height;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id")
    private Post post;

    private void setPost(Post post) {
        this.post = post;
        post.setPostFile(this);
    }

    public static PostFile create(Post post, SavedFile savedFile) {
        PostFile postFile = PostFile.builder()
                .name(savedFile.getName())
                .extension(savedFile.getExtension())
                .server(savedFile.getFileServer())
                .size(savedFile.getSize())
                .url(savedFile.getPublicUrl())
                .width(savedFile.getWidth())
                .height(savedFile.getHeight())
                .type(savedFile.getFileType())
                .build();
        postFile.setPost(post);
        return postFile;
    }
}
