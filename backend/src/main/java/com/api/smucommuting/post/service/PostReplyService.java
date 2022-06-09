package com.api.smucommuting.post.service;

import com.api.smucommuting.common.exception.post.PostNotFoundException;
import com.api.smucommuting.common.exception.post.PostReplyNotFoundException;
import com.api.smucommuting.post.domain.Post;
import com.api.smucommuting.post.domain.PostReply;
import com.api.smucommuting.post.domain.PostReplyValidator;
import com.api.smucommuting.post.domain.repository.PostReplyRepository;
import com.api.smucommuting.post.domain.repository.PostRepository;
import com.api.smucommuting.post.dto.PostReplyRequest;
import com.api.smucommuting.post.dto.PostReplyResponse;
import com.api.smucommuting.user.domain.User;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Service
@Transactional
@RequiredArgsConstructor
public class PostReplyService {
    private final PostReplyRepository postReplyRepository;
    private final PostRepository postRepository;
    private final PostReplyValidator postReplyValidator;


    public PostReplyResponse.OnlyId create(Long postId, PostReplyRequest.CreateOrUpdate request, User loginUser) {
        Post post = postRepository.findById(postId).orElseThrow(PostNotFoundException::new);
        PostReply reply = PostReply.create(request.toEntity(), post, loginUser);

        PostReply savedReply = postReplyRepository.save(reply);
        return PostReplyResponse.OnlyId.build(savedReply);
    }

    @Transactional(readOnly = true)
    public List<PostReplyResponse.GetList> getList(Long postId, User loginUser) {
        List<PostReply> replies = postReplyRepository.findAllByPostIdWithWriter(postId);
        return PostReplyResponse.GetList.listsOf(replies, loginUser);
    }

    public void update(Long replyId, PostReplyRequest.CreateOrUpdate request, User loginUser) {
        PostReply reply = postReplyRepository.findById(replyId).orElseThrow(PostReplyNotFoundException::new);
        reply.update(request.toEntity(), reply, postReplyValidator, loginUser);
    }

    public void delete(Long replyId, User loginUser) {
        PostReply reply = postReplyRepository.findById(replyId).orElseThrow(PostReplyNotFoundException::new);
        reply.delete(reply, postReplyValidator, loginUser);
        postReplyRepository.delete(reply);
    }
}
