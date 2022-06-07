package com.api.smucommuting.post.service;

import com.api.smucommuting.common.dto.PageDto;
import com.api.smucommuting.common.exception.post.PostNotFoundException;
import com.api.smucommuting.post.domain.Post;
import com.api.smucommuting.post.domain.PostValidator;
import com.api.smucommuting.post.domain.repository.PostRepository;
import com.api.smucommuting.post.dto.PostRequest;
import com.api.smucommuting.post.dto.PostResponse;
import com.api.smucommuting.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class PostService {
    private final PostRepository postRepository;
    private final PostFileService postFileService;
    private final PostValidator postValidator;

    public PostResponse.OnlyId create(PostRequest.CreateInfo request, MultipartFile image, User user) {
        Post post = Post.create(request.toEntity(), user);
        Post createdPost = postRepository.save(post);
        postFileService.upload(createdPost, image);

        return PostResponse.OnlyId.build(createdPost);
    }

    @Transactional(readOnly = true)
    public PostResponse.GetOne getOne(Long postId, User loginUser) {
        Post post = postRepository.findByPostIdWithImageAndWriter(postId).orElseThrow(PostNotFoundException::new);

        return PostResponse.GetOne.build(post, loginUser);
    }

    @Transactional(readOnly = true)
    public List<PostResponse.GetList> getList(PageDto pageDto) {
        List<Post> posts = postRepository.findAllOrderByCreatedAtDesc(pageDto.of());

        return PostResponse.GetList.listsOf(posts);
    }

    public void deleteOne(Long postId, User loginUser) {
        Post post = postRepository.findById(postId).orElseThrow(PostNotFoundException::new);
        post.delete(postValidator, loginUser);
        postFileService.delete(postId);
        postRepository.delete(post);
    }
}
