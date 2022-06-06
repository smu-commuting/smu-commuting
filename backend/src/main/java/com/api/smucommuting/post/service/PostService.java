package com.api.smucommuting.post.service;

import com.api.smucommuting.post.domain.Post;
import com.api.smucommuting.post.domain.repository.PostRepository;
import com.api.smucommuting.post.dto.PostRequest;
import com.api.smucommuting.post.dto.PostResponse;
import com.api.smucommuting.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
@Transactional
public class PostService {
    private final PostRepository postRepository;
    private final PostFileService postFileService;

    public PostResponse.OnlyId create(PostRequest.CreateInfo request, MultipartFile image, User user) {
        Post post = Post.create(request.toEntity(), user);
        Post createdPost = postRepository.save(post);
        postFileService.upload(createdPost, image);

        return PostResponse.OnlyId.build(createdPost);
    }

    public PostResponse.GetOne getOne(Long postId, User loginUser) {
        Post post = postRepository.findByPostIdWithImageAndWriter(postId).orElseThrow();

        return PostResponse.GetOne.build(post, loginUser);
    }
}
