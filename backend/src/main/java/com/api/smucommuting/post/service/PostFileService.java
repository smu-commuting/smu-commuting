package com.api.smucommuting.post.service;

import com.api.smucommuting.common.file.S3Uploader;
import com.api.smucommuting.common.file.SavedFile;
import com.api.smucommuting.post.domain.Post;
import com.api.smucommuting.post.domain.PostFile;
import com.api.smucommuting.post.domain.repository.PostFileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@RequiredArgsConstructor
class PostFileService {
    private final PostFileRepository postFileRepository;
    private final S3Uploader s3Uploader;

    @Transactional
    public void upload(Post post, MultipartFile file) {
        SavedFile savedFile = s3Uploader.upload(file);
        PostFile postFile = PostFile.create(post, savedFile);
        postFileRepository.save(postFile);
    }
}
